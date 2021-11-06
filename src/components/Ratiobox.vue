<template>
    <div
        class="ratiobox"
        :style="{'border': checked ? `6px solid ${fillColor}` : `1px solid ${borderColor}`}"
        v-bind="$attrs"
        v-on="$listeners"
        >
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class RatioBox extends Vue {
    @Prop({ default: '#4B970F' }) private fillColor!: string
    @Prop({ default: 'rgba(40, 49, 70, 0.12)' }) private borderColor!: string
    @Prop({ default: false }) private checked!: boolean
}
</script>

<style lang="scss" scoped>
.ratiobox {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    &:hover {
        cursor: pointer;
    }
}
</style>