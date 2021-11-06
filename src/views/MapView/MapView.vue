<template>
    <div>
        <vl-map
            ref="map"
            class="map"
            :load-tiles-while-animating="true"
            :load-tiles-while-interacting="true"
            :default-controls="{attribution: true, rotate: true, zoom: false}"
            data-projection="EPSG:3857"
            @pointermove="onPointerMove"
            @click="onClickOnMap"
            :key="`vl-map-key`"
            cross-origin='anonymous'
        >
            <vl-view
                :zoom.sync="getMapData.zoom"
                :center.sync="getMapData.center"
                :min-zoom="getMapData.MIN_ZOOM"
                :max-zoom="getMapData.MAX_ZOOM"
                :key="`vl-view-view`"
                :enable-rotation="false"
                ref="vlView"
                cross-origin='anonymous'
            />

            <LayerGroup />

        </vl-map>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter, Mutation } from 'vuex-class'
import { GetterNames, MutationNames } from '@/store/types'

import LayerGroup from './components/LayerGroup.vue'

@Component({
    components: {
        LayerGroup
    }
})
export default class MapView extends Vue {
    public $refs!: {
        map: any,
        vlView: any
    }

    @Getter(GetterNames.getMapData) private getMapData!: any

    private onClickOnMap(evt: any) {
        // TODO
    }

    private onPointerMove(evt: any) {
        // TODO
    }

}
</script>

<style lang="scss" scoped>
body {
    height: 100%;
    margin: 0;
    padding: 0;
    width: 100%;
    overflow: hidden;
    .vl-map {
        height: 100%;
        width: 100%;
        background: #000;
        position: fixed;
    }

    .v-input--selection-controls {
        margin: 0;
    }
}
</style>
