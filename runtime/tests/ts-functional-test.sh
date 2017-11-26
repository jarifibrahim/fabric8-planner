#!/bin/bash
set -e -u -o pipefail

declare -r SCRIPT_PATH=$(readlink -f "$0")
declare -r SCRIPT_DIR=$(cd $(dirname "$SCRIPT_PATH") && pwd)

declare -r SPEC_DIR=$(readlink -f "$SCRIPT_DIR/../src/spec")
declare -r CONFIG_DIR=$(readlink -f "$SCRIPT_DIR/../config")

declare -r TEST_CONF="$CONFIG_DIR/functional-test.conf.sh"
declare -r PROTRACTOR_CONF="$CONFIG_DIR/protractor.config"  # NOTE: append .ts or .js

source "$SCRIPT_DIR/lib.inc.sh"

validate_config() {
  local ret=0

  file_must_exist "protractor config", "$PROTRACTOR_CONF.js" || ret=1
  validate_test_config OSIO_USERNAME "$OSIO_USERNAME" || ret=1
  validate_test_config OSIO_PASSWORD "$OSIO_PASSWORD" || ret=1

  return $ret
}


transpile() {
  log.info "Transpiling spec files ... "

  # TODO(sthaha): make protractor config in ts as well
  # npm run tsc -- -p "$PROTRACTOR_CONF.ts" || {
    # log.error "ts -> js compilation of protractor config failed"
    # return 1
  # }

  npm run tsc -- -p "$SPEC_DIR" || {
    log.warn "ts -> js compilation failed; fix it and rerun $0"
    return 1
  }
  return 0
}


main() {
  local suite=${1:-specs}

  file_must_exist "Test config" "$TEST_CONF" || exit 1

  source "$TEST_CONF"
  validate_config || {
    log.info "Please set test configs and re-run $0"
    exit 1
  }

  # NOTE: DO NOT start webdriver since we are using directConnection to chrome
  # see: http://www.protractortest.org/#/server-setup#connecting-directly-to-browser-drivers

  local direct_connection=true
  if [[ ${USE_WEBDRIVER:-false} == true ]]; then
    direct_connection=false

    log.info "USE_WEBDRIVER set; test may run slow .. checking webdriver status"
    webdriver_running || {
      local log_file="${SCRIPT_DIR}/webdriver.log"
      start_webdriver "$log_file"
      wait_for_webdriver
    }
  else
    log.info "USE_WEBDRIVER is not set or false; using direct connection (faster)"
  fi


  transpile || exit 1
  file_must_exist "protractor config", "$PROTRACTOR_CONF.js" || exit 1

  local protractor="$(npm bin)/protractor"
  [[ ${NODE_DEBUG:-false} == true ]] && protractor="node --inspect --debug-brk $protractor"

  # NOTE: do NOT quote $protractor as we want spaces to be interpreted as
  # seperate arguments

  DIRECT_CONNECTION=${direct_connection} $protractor --baseUrl "$OSIO_URL" \
    "$PROTRACTOR_CONF.js" \
    --suite "${suite}" \
    --params.login.user="$OSIO_USERNAME" \
    --params.login.password="$OSIO_PASSWORD" \
    --params.github.username="$GITHUB_USERNAME"

  return $?
}

main "$@"
