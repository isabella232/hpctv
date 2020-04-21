#!/usr/bin/env bash
#requires bash >= v4

#these should be set in circleci HPCTV context, or uncomment to run locally
#HPCTV_SAM_API_USER=
#HPCTV_SAM_API_PASSWORD=

API_PREFIX="/api/protected/admin/v1/report"

declare -A ENDPOINTS
ENDPOINTS[report_activity_days_ago_60]="${API_PREFIX}/activity/machine/cheyenne?daysAgo=60"
ENDPOINTS[report_aoiglog_aoig_atmospheric_chemistry_days_ago_30]="${API_PREFIX}/aoiglog/machine/cheyenne/aoig/Atmospheric%20Chemistry?daysAgo=30"
ENDPOINTS[report_aoiglog_aoig_computational_science_days_ago_30]="${API_PREFIX}/aoiglog/machine/cheyenne/aoig/Computational%20Science?daysAgo=30"
ENDPOINTS[report_aoiglog_aoig_environmental_biology_days_ago_30]="${API_PREFIX}/aoiglog/machine/cheyenne/aoig/Environmental%20Biology?daysAgo=30"
ENDPOINTS[report_aoiglog_aoig_fluid_dynamics_and_turbulence_days_ago_30]="${API_PREFIX}/aoiglog/machine/cheyenne/aoig/Fluid%20Dynamics%20and%20Turbulence?daysAgo=30"
ENDPOINTS[report_aoiglog_aoig_geospace_sciences_days_ago_30]="${API_PREFIX}/aoiglog/machine/cheyenne/aoig/Geospace%20Sciences?daysAgo=30"
ENDPOINTS[report_aoiglog_aoig_ocean_sciences_days_ago_30]="${API_PREFIX}/aoiglog/machine/cheyenne/aoig/Ocean%20Sciences?daysAgo=30"
ENDPOINTS[report_aoiglog_aoig_social_and_economic_impacts_days_ago_30]="${API_PREFIX}/aoiglog/machine/cheyenne/aoig/Social%20and%20Economic%20Impacts?daysAgo=30"
ENDPOINTS[report_aoiglog_aoig_weather_prediction_days_ago_30]="${API_PREFIX}/aoiglog/machine/cheyenne/aoig/Weather%20Prediction?daysAgo=30"
ENDPOINTS[report_log_days_ago_1]="${API_PREFIX}/log/machine/cheyenne?daysAgo=1"
ENDPOINTS[report_projectlog_days_ago_1]="${API_PREFIX}/projectlog/machine/cheyenne?daysAgo=1"
ENDPOINTS[report_projectlog_days_ago_30]="${API_PREFIX}/projectlog/machine/cheyenne?daysAgo=30"
ENDPOINTS[report_total]="${API_PREFIX}/total/machine/cheyenne"

for key in "${!ENDPOINTS[@]}"
do
    echo "fetching ${ENDPOINTS[$key]}"
    curl --retry 1 --retry-delay 5 --retry-max-time 10 --user ${HPCTV_SAM_API_USER}:${HPCTV_SAM_API_PASSWORD} https://sam.ucar.edu${ENDPOINTS[$key]} -o ./data/${key}.json
    [[ ! -s ./data/${key}.json ]] && echo "./data/${key}.json is empty" && exit 1;
    sleep 1
done