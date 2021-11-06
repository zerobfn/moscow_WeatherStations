<template>
    <div>
        <vl-layer-group cross-origin='anonymous'>
            <vl-layer-tile cross-origin='anonymous'>
                <vl-source-osm
                    v-if="getLayerType === 'google'"
                    cross-origin='anonymous'
                    :attributions="attributions"
                    url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
                />
                <vl-source-xyz
                    v-else-if="getLayerType === 'osm'"
                    cross-origin='anonymous'
                    :attributions="attributions"
                    url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </vl-layer-tile>
        </vl-layer-group>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { GetterNames } from '@/store/types'

@Component
export default class LayerGroup extends Vue {
    @Getter(GetterNames.getLayerType) private getLayerType!: any
    private attributions = [
        '© <a href="https://egistic.kz/">EGISTIC LTD</a>',
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    ]
}
</script>