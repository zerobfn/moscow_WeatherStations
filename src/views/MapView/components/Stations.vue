<template>
    <div>
        <vl-layer-vector cross-origin='anonymous'>
            <vl-feature v-for="(station, index) in stations"
                :key="`stations-${index}`"
                :properties="{
                    id: station.id,
                    type: 'station'
                }"
            >
                <vl-geom-point :coordinates="station.coordinates"/>
            <vl-style-box>
                <vl-style-circle
                    :radius="getStation === station.id ? 14 : 10">
                    <vl-style-fill
                        :color="isDataAvailable(station.id) ? '#4B970F' : '#878882'"
                    />
                    <vl-style-stroke
                        :color="isDataAvailable(station.id) ? '#80E333' : '#E0E2D8'"
                        :width="getStation === station.id ? 6 : 4"
                    />
                </vl-style-circle>
            </vl-style-box>
            <vl-overlay
                v-if="hoverId === station.id"
                :position="station.coordinates"
                :offset="[15, 0]"
                :positioning="'center-left'"
            >
                <div class="station">
                    {{station.name}}
                </div>
            </vl-overlay>
            </vl-feature>
        </vl-layer-vector>
        <vl-interaction-select
            :features.sync="selectedFeatures"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Getter, Mutation } from 'vuex-class'
import { GetterNames, MutationNames } from '@/store/types'
import { stations } from '@/data/stations'

@Component
export default class LayerGroup extends Vue {
    @Getter(GetterNames.getStation) private getStation!: any
    @Mutation(MutationNames.setStation) private setStation!: any
    @Prop({ default: null }) private map!: any
    private stations = stations
    private hoverId = -1
    private selectedFeatures: any[] = []

    @Watch('selectedFeatures')
    private onSelectFeature(val: any, old: any) {
        if (this.selectedFeatures.length === 0) return
        else {
            if (val[0].properties.type === 'station') {
                this.setStation(val[0].properties.id)
            }
            this.selectedFeatures = []
        }
    }

    private isDataAvailable(id: any) {
        if (id === 1) return true
        else if (id === 6) return true
        else return false
    }
    private onPointerMove(evt: any) {
        if (this.map) {
            this.hoverId = -1
            const hit = this.map.forEachFeatureAtPixel(evt.pixel, (feature: any) => {
                const featureType = feature.get('type')
                if (featureType === 'station') {
                    this.hoverId = feature.get('id')
                } else {
                    this.hoverId = -1
                }
                return true
            })
            if (hit) {
                this.map.$map.getTargetElement().style.cursor = 'pointer'
            } else {
                this.map.$map.getTargetElement().style.cursor = ''
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.station {
    padding: 8px 12px;
    background: #FFFFFF;
    border-radius: 6px;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #1C1C1C;
}
</style>