<template>
    <div class="Sideboard" :class="{'collapsed': getStation !== null}">
        <div class="Sideboard_header">
            <div class="Sideboard_header-text">
                {{getName}}
            </div>
            <BaseIcon
                class="Sideboard_header-icon"
                @click="setStation(null)"
                :src="require('!html-loader!@/assets/close_icon.svg')"/>
        </div>
        <div class="Sideboard_body" v-show="getStation === 1 || getStation === 6">
            <BaseSelectBox
                :header="'Данные за'"
                :placeholder="''"
                :width="'100%'"
                :divID="'date_select-activator'"
                :dropdownItems="getDates"
                @selectItem="onSelectDate"
                :selectedName="selectedDate"
                v-model="selectedDate"
                :readonly="true"
            />
            <div class="options" v-if="getStation === 1">
                <div class="option">
                    <Ratiobox
                        class="option_ratio"
                        :fillColor="'#4B970F'"
                        @click="selectedIndicator='CO'; fillData()"
                        :checked="selectedIndicator === 'CO'"/>
                    <div class="option_text">
                        CO
                    </div>
                </div>
                <div class="option">
                    <Ratiobox
                        class="option_ratio"
                        :fillColor="'#008CDB'"
                        @click="selectedIndicator='NO'; fillData()"
                        :checked="selectedIndicator === 'NO'"/>
                    <div class="option_text">
                        NO
                    </div>
                </div>
                <div class="option">
                    <Ratiobox
                        class="option_ratio"
                        :fillColor="'#FFC700'"
                        @click="selectedIndicator='NO2'; fillData()"
                        :checked="selectedIndicator==='NO2'"/>
                    <div class="option_text">
                        NO2
                    </div>
                </div>
                <div class="option">
                    <Ratiobox
                        class="option_ratio"
                        :fillColor="'#D51900'"
                        @click="selectedIndicator='PM2.5'; fillData()"
                        :checked="selectedIndicator === 'PM2.5'"/>
                    <div class="option_text">
                        PM2.5
                    </div>
                </div>
            </div>
            <div class="options" v-else-if="getStation === 6">
                <div class="option">
                    <Ratiobox
                        class="option_ratio"
                        :fillColor="'#008CDB'"
                        @click="selectedIndicator='NO'; fillData()"
                        :checked="selectedIndicator === 'NO'"/>
                    <div class="option_text">
                        NO
                    </div>
                </div>
                <div class="option">
                    <Ratiobox
                        class="option_ratio"
                        :fillColor="'#D51900'"
                        @click="selectedIndicator='PM10'; fillData()"
                        :checked="selectedIndicator === 'PM10'"/>
                    <div class="option_text">
                        PM10
                    </div>
                </div>
            </div>
            <div class="main_graph">
                <canvas class="main-chart" id="main-chart"></canvas>
            </div>
        </div>
        <div class="Sideboard_body" v-show="getStation !== 1 && getStation !== 6">
                <div class="placeholder">
                    <BaseIcon class="placeholder-icon"
                        :src="require('!html-loader!@/assets/menu_checked_icon.svg')"
                        :width="80"
                        :height="80"
                    />
                    <p class="placeholder-text">Данные не загружены</p>
                </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter, Mutation } from 'vuex-class'
import { GetterNames, MutationNames } from '@/store/types'
import { stations } from '@/data/stations'
import { data as station1Data } from '@/data/1'
import { data as station6Data } from '@/data/5year'
import Chart from 'chart.js'

@Component
export default class SideBoard extends Vue {
    @Getter(GetterNames.getStation) private getStation!: any
    @Mutation(MutationNames.setStation) private setStation!: any
    private stations = stations
    private station1Data = station1Data
    private station6Data = station6Data
    private selectedDate = ''
    private selectedIndicator = ''
    private mainChart: any = null

    get getName() {
        const station = this.stations.find((x: any) => x.id === this.getStation)
        return station ? station.name : ''
    }

    get getDates() {
        if (this.getStation === 1) {
            return this.station1Data.map((x: any) => x.date)
        } else if (this.getStation === 6) {
            return this.station6Data.map((x: any) => x.date)
        } else return []
    }

    private onSelectDate(item: any) {
        this.selectedDate = item.name
        this.fillData()
    }

    private mounted() {
        Chart.defaults.line.showLines = true
        Chart.defaults.line.spanGaps = true
        const ctx: any = document.getElementById('main-chart')
        this.mainChart = new Chart(ctx.getContext('2d'), {
            type: 'line',
            data: {
                datasets: []
            },
            options: {
                legend: false,
                points: true,
                discrete: false,
                hover: {
                    mode: 'point'
                },
                scales: {
                    yAxes: [
                        {
                            id: 'y-axis-1',
                            position: 'left',
                            gridLines: {color: 'rgba(0, 0, 0, 0.64)', zeroLineColor: '#000000'}
                        },
                        {
                            id: 'y-axis-2',
                            position: 'right',
                            gridLines: {color: 'rgba(0, 0, 0, 0.64)', zeroLineColor: '#000000'},
                            ticks: {
                                callback(label: any) {
                                    return
                                }
                            }
                        }],
                    xAxes: [
                        {
                            type: 'time',
                            time: {
                                unit: 'hour',
                                tooltipFormat: 'HH:mm',
                                displayFormats: {
                                    'hour': 'HH:mm'
                                }
                            },
                            ticks: {
                                fontColor: '#000000',
                                autoSkip: true,
                                maxTicksLimit: 6,
                                maxRotation: 0,
                                minRotation: 0
                            }
                        }
                    ]
                }
            }
        })
    }

    @Watch('getStation')
    private onchangeStation() {
        if (this.getStation === 1 || this.getStation === 6) {
            this.selectedDate = '15.01.2021'
            if (this.getStation === 1) {
                this.selectedIndicator = 'CO'
            } else {
                this.selectedIndicator = 'NO'
            }
            this.fillData()
        }
    }

    private fillData() {
        if (this.getStation === 1) {
            const date: any = this.station1Data.find((x: any) => x.date === this.selectedDate)
            if (date) {
                const type = date.data.find((x: any) => x.type === this.selectedIndicator)
                if (type) {
                    const indicatorData = []
                    for (const key in type.data) {
                        indicatorData.push({
                            t: key,
                            y: Number(type.data[key])
                        })
                    }
                    if (this.selectedIndicator === 'CO') {
                        this.mainChart.data.datasets = [{label: 'CO', data: indicatorData, fill: true, fillColor: '#4B970F',  borderColor: '#4B970F'}]
                    } else if (this.selectedIndicator === 'NO') {
                        this.mainChart.data.datasets = [{label: 'NO', data: indicatorData, fill: true, fillColor: '#008CDB',  borderColor: '#008CDB'}]
                    } else if (this.selectedIndicator === 'NO2') {
                        this.mainChart.data.datasets = [{label: 'NO2', data: indicatorData, fill: true, fillColor: '#FFC700',  borderColor: '#FFC700'}]
                    } else if (this.selectedIndicator === 'PM2.5') {
                        this.mainChart.data.datasets = [{label: 'PM2.5', data: indicatorData, fill: true, fillColor: '#D51900',  borderColor: '#D51900'}]
                    }
                    this.mainChart.update()
                }
            }
        } else if (this.getStation === 6) {
            const date: any = this.station6Data.find((x: any) => x.date === this.selectedDate)
            if (date) {
                const typeUpper = date.data.find((x: any) => x.type === `${this.selectedIndicator}_upper`)
                const type = date.data.find((x: any) => x.type === this.selectedIndicator)
                const typeLower = date.data.find((x: any) => x.type === `${this.selectedIndicator}_lower`)
                if (typeUpper && type && typeLower) {
                    const upperData = []
                    const lowerData = []
                    const typeData = []
                    for (const key in typeUpper.data) {
                        upperData.push({
                            t: key,
                            y: Number(typeUpper.data[key])
                        })
                    }
                    for (const key in typeLower.data) {
                        lowerData.push({
                            t: key,
                            y: Number(typeLower.data[key])
                        })
                    }
                    for (const key in type.data) {
                        typeData.push({
                            t: key,
                            y: Number(type.data[key])
                        })
                    }
                    const data = []
                    if (this.selectedIndicator === 'NO') {
                        data.push({label: 'NO_lower',
                            data: lowerData,
                            borderWidth: 0,
                            pointHitRadius: 5,
                            pointRadius: 0,
                            pointHoverBackgroundColor: '#008CDB',
                            fill: false})
                        data.push({label: 'NO',
                            data: typeData,
                            backgroundColor: 'rgba(0, 140, 219, 0.1)',
                            borderColor: '#008CDB',
                            fill: "-1"})
                        data.push({label: 'NO_upper',
                            data: upperData,
                            backgroundColor: 'rgba(0, 140, 219, 0.1)',
                            borderWidth: 0,
                            pointHitRadius: 5,
                            pointRadius: 0,
                            pointHoverBackgroundColor: '#008CDB',
                            fill: "-1",
                            line: false})
                    } else if (this.selectedIndicator === 'PM10') {
                        data.push({label: 'PM10_lower',
                            data: lowerData,
                            borderWidth: 0,
                            pointHitRadius: 5,
                            pointRadius: 0,
                            pointHoverBackgroundColor: '#D51900',
                            fill: false})
                        data.push({label: 'PM10',
                            data: typeData,
                            backgroundColor: 'rgba(213, 25, 0, 0.1)',
                            borderColor: '#D51900',
                            fill: "-1"})
                        data.push({label: 'PM10_upper',
                            data: upperData,
                            backgroundColor: 'rgba(213, 25, 0, 0.1)',
                            pointHoverBackgroundColor: '#D51900',
                            borderWidth: 0,
                            pointHitRadius: 5,
                            pointRadius: 0,
                            fill: "-1",
                            line: false})
                    }
                    this.mainChart.data.datasets = data
                    this.mainChart.update()
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.Sideboard {
    width: 0;
    height: 100%;
    transition: all 0.3s ease;
    background: #FFFFFF;
    box-shadow: 1px 0px 0px rgba(40, 49, 70, 0.08), 2px 0px 4px rgba(40, 49, 70, 0.06);
    display: flex;
    flex-direction: column;
    &.collapsed {
        width: 400px;
    }
    &_header {
        display: flex;
        padding: 16px 16px 16px 24px;
        &-text {
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            line-height: 24px;
            color: #4B970F;
        }
        &-icon {
            margin-left: auto;
            width: 24px;
            height: 24px;
        }
    }
    &_body {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        overflow-y: auto;
        padding: 24px;
        .options {
            margin-top: 24px;
            display: flex;
            .option {
                display: flex;
                margin-right: 16px;
                &_ration {
                    width: 20px;
                    height: 20px;
                }
                &_text {
                    margin-left: 8px;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 14px;
                    line-height: 20px;
                    color: #1C1C1C;
                }
            }
        }
        .main_graph {
            margin-top: 16px;
        }
    }
}
.placeholder{
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    &-icon{
        width: 80px;
        height: 80px;
    }
    &-text{
        width: 240px;
        margin-top: 16px;
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 18px;/* or 129% */
        text-align: center;

        color: rgba(51, 50, 50, 0.48);
    }
}
</style>