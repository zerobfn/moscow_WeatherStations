<template>
    <div class="MapControllers">
        <div class="layers_btn"
            id="layers_dropdown-activator"
            @click="toggleLayersDropdown()">
            <BaseIcon class="icon" :src="require('!html-loader!@/assets/layers_icon.svg')"/>
        </div>
        <div class="layers" id="layers_dropdown-activator"
            v-outside-click="{except: 'layers_dropdown-activator', callback: closeLayersDropdown}"
            v-show="layersDropdown"
        >
            <div class="layers_header">
                Подложка
            </div>
            <div class="layers_row">
                <Ratiobox
                    class="layers_row-icon"
                    :fillColor="'#FFFFFF'"
                    :borderColor="'#ABAEA3'"
                    @click="changeLayerType('google')"
                    :checked="getLayerType === 'google'"
                />
                <div class="layers_row-text" :class="{'selected': getLayerType === 'google'}">
                    Спутник
                </div>
            </div>
            <div class="layers_row">
                <Ratiobox
                    class="layers_row-icon"
                    :fillColor="'#FFFFFF'"
                    :borderColor="'#ABAEA3'"
                    @click="changeLayerType('osm')"
                    :checked="getLayerType === 'osm'"
                />
                <div class="layers_row-text" :class="{'selected': getLayerType === 'osm'}">
                    Схема
                </div>
            </div>
        </div>
        <div class="zoom_container">
            <div class="zoom-in btn" @click="incZoom()">
                <BaseIcon class="icon" :src="require('!html-loader!@/assets/plus_icon.svg')"/>
            </div>
            <div class="zoom-out btn" @click="decZoom()">
                <BaseIcon class="icon" :src="require('!html-loader!@/assets/minus_icon.svg')"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter, Mutation } from 'vuex-class'
import { GetterNames, MutationNames } from '@/store/types'

@Component
export default class MapControllers extends Vue {
    @Getter(GetterNames.getLayerType) private getLayerType!: any
    @Mutation(MutationNames.changeLayerType) private changeLayerType!: any
    @Mutation(MutationNames.incZoom) private incZoom!: any
    @Mutation(MutationNames.decZoom) private decZoom!: any
    private layersDropdown = false

    private toggleLayersDropdown() {
        this.layersDropdown = !this.layersDropdown
    }

    private closeLayersDropdown() {
        this.layersDropdown = false
    }
}
</script>

<style lang="scss" scoped>
.MapControllers {
    width: 100%;
    .layers_btn {
        position: absolute;
        z-index: 2;
        top: 16px;
        right: 16px;
        width: 40px;
        height: 40px;
        border-radius: 6px;
        background: #FFFFFF;
        padding: 8px;
        &:hover {
            cursor: pointer;
        }
    }
    .layers {
        position: absolute;
        width: 180px;
        z-index: 3;
        padding: 16px;
        top: 16px;
        right: 64px;
        background: #878882;
        box-shadow: 0px 1px 0px rgba(40, 49, 70, 0.08), 0px 2px 4px rgba(40, 49, 70, 0.06);
        border-radius: 6px;
        &_header {
            margin-bottom: 12px;
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            line-height: 16px;
            letter-spacing: 0.02em;
            color: rgba(255, 255, 255, 0.64);
        }
        &_row {
            padding: 6px 2px;
            display: flex;
            &-icon {
                width: 20px;
                height: 20px;
            }
            &-text {
                margin-left: 16px;
                font-style: normal;
                font-weight: normal;
                font-size: 14px;
                line-height: 20px;
                color: #E0E2D8;
                &.selected {
                    color: #FFFFFF;
                }
            }
        }
    }
    .zoom_container {
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
        background: #FFFFFF;
        border-radius: 6px;
        .btn {
            padding: 8px;
            &:hover {
                cursor: pointer;
            }
        }
    }
}
</style>
