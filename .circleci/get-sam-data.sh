#!/usr/bin/env bash
#requires bash >= v4

#these should be set in circleci HPCTV context, or uncomment to run locally
#HPCTV_SAM_API_USER=
#HPCTV_SAM_API_PASSWORD=

declare -A ENDPOINTS
ENDPOINTS[report_activity_days_ago_60]="/api/protected/admin/v1/report/activity/machine/cheyenne?daysAgo=60"
ENDPOINTS[report_aoiglog_aoig_atmospheric_chemistry_days_ago_30]="/api/protected/admin/v1/report/aoiglog/machine/cheyenne/aoig/atmoshperic_chemistry?daysAgo=30"
ENDPOINTS[report_aoiglog_aoig_computational_science_days_ago_30]="/api/protected/admin/v1/report/aoiglog/machine/cheyenne/aoig/computational_science?daysAgo=30"
ENDPOINTS[report_aoiglog_aoig_environmental_biology_days_ago_30]="/api/protected/admin/v1/report/aoiglog/machine/cheyenne/aoig/atmoshperic_chemistry?daysAgo=30"
ENDPOINTS[report_aoiglog_aoig_fluid_dynamics_and_turbulence_days_ago_30]="/api/protected/admin/v1/report/aoiglog/machine/cheyenne/aoig/atmoshperic_chemistry?daysAgo=30"
ENDPOINTS[report_aoiglog_aoig_geospace_sciences_days_ago_30]="/api/protected/admin/v1/report/aoiglog/machine/cheyenne/aoig/atmoshperic_chemistry?daysAgo=30"
ENDPOINTS[report_aoiglog_aoig_ocean_sciences_days_ago_30]="/api/protected/admin/v1/report/aoiglog/machine/cheyenne/aoig/atmoshperic_chemistry?daysAgo=30"
ENDPOINTS[report_aoiglog_aoig_social_and_economic_impacts_days_ago_30]="/api/protected/admin/v1/report/aoiglog/machine/cheyenne/aoig/atmoshperic_chemistry?daysAgo=30"
ENDPOINTS[report_aoiglog_aoig_weather_prediction_days_ago_30]="/api/protected/admin/v1/report/aoiglog/machine/cheyenne/aoig/atmoshperic_chemistry?daysAgo=30"
ENDPOINTS[report_log_days_ago_1]="/api/protected/admin/v1/report/log/machine/cheyenne?daysAgo=1"
ENDPOINTS[report_projectlog_days_ago_1]="/api/protected/admin/v1/report/projectlog/machine/cheyenne?daysAgo=1"
ENDPOINTS[report_projectlog_days_ago_30]="/api/protected/admin/v1/report/projectlog/machine/cheyenne?daysAgo=30"
ENDPOINTS[report_total]="/api/protected/admin/v1/report/total/machine/cheyenne"

PROJECT_DIR="$( dirname "$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )")"

for key in "${!ENDPOINTS[@]}"
do
    echo "fetching ${ENDPOINTS[$key]}"
    curl --user ${HPCTV_SAM_API_USER}:${HPCTV_SAM_API_PASSWORD} https://sam.ucar.edu${ENDPOINTS[$key]} -o ${PROJECT_DIR}/data/${key}.json
    [[ ! -s ${PROJECT_DIR}/data/${key}.json ]] && echo "${PROJECT_DIR}/data/${key}.json is empty" && exit 1;
    sleep 1
done