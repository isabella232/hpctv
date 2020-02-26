#!/usr/bin/env bash
#requires bash >= v4

#these should be set in circleci HPCTV context, or uncomment to run locally
#HPCTV_SAM_API_USER=
#HPCTV_SAM_API_PASSWORD=

API_PREFIX="/api/protected/admin/v1/report"

declare -A ENDPOINTS
ENDPOINTS[report_activity_days_ago_60]="${API_PREFIX}/activity/machine/cheyenne?daysAgo=60"
ENDPOINTS[report_aoiglog_aoig_atmospheric_chemistry_days_ago_30]="${API_PREFIX}/aoiglog/machine/cheyenne/aoig/atmoshperic_chemistry?daysAgo=30"
ENDPOINTS[report_aoiglog_aoig_computational_science_days_ago_30]="${API_PREFIX}/aoiglog/machine/cheyenne/aoig/computational_science?daysAgo=30"
ENDPOINTS[report_aoiglog_aoig_environmental_biology_days_ago_30]="${API_PREFIX}/aoiglog/machine/cheyenne/aoig/environmental_biology?daysAgo=30"
ENDPOINTS[report_aoiglog_aoig_fluid_dynamics_and_turbulence_days_ago_30]="${API_PREFIX}/aoiglog/machine/cheyenne/aoig/fluid_dynamics_and_turbulence?daysAgo=30"
ENDPOINTS[report_aoiglog_aoig_geospace_sciences_days_ago_30]="${API_PREFIX}/aoiglog/machine/cheyenne/aoig/geospace_sciences?daysAgo=30"
ENDPOINTS[report_aoiglog_aoig_ocean_sciences_days_ago_30]="${API_PREFIX}/aoiglog/machine/cheyenne/aoig/ocean_sciences?daysAgo=30"
ENDPOINTS[report_aoiglog_aoig_social_and_economic_impacts_days_ago_30]="${API_PREFIX}/aoiglog/machine/cheyenne/aoig/social_and_economic_impacts?daysAgo=30"
ENDPOINTS[report_aoiglog_aoig_weather_prediction_days_ago_30]="${API_PREFIX}/aoiglog/machine/cheyenne/aoig/weather_prediction?daysAgo=30"
ENDPOINTS[report_log_days_ago_1]="${API_PREFIX}/log/machine/cheyenne?daysAgo=1"
ENDPOINTS[report_projectlog_days_ago_1]="${API_PREFIX}/projectlog/machine/cheyenne?daysAgo=1"
ENDPOINTS[report_projectlog_days_ago_30]="${API_PREFIX}/projectlog/machine/cheyenne?daysAgo=30"
ENDPOINTS[report_total]="${API_PREFIX}/total/machine/cheyenne"

PROJECT_DIR="$( dirname "$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )")"

for key in "${!ENDPOINTS[@]}"
do
    echo "fetching ${ENDPOINTS[$key]}"
    curl --retry 1 --retry-delay 5 --retry-max-time 10 --user ${HPCTV_SAM_API_USER}:${HPCTV_SAM_API_PASSWORD} https://sam.ucar.edu${ENDPOINTS[$key]} -o ${PROJECT_DIR}/data/${key}.json
    [[ ! -s ${PROJECT_DIR}/data/${key}.json ]] && echo "${PROJECT_DIR}/data/${key}.json is empty" && exit 1;
    sleep 1
done