<template>
    <div class="Icon_Container">
        <div
            v-html="src"
            class="icon"
            ref="IconContainer"
            v-bind="$attrs"
            v-on="$listeners"
            @mouseover="changeFillColor()"
        >
        </div>
        <div class="tooltiptext" v-if="tooltip !== ''"
            :class="{'bottom': position.includes('bottom'), 'top': position.includes('top'),
            'left': position.includes('left'), 'right': position.includes('right')}">
            {{tooltip}}
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
@Component
export default class BaseIcon extends Vue {
    public $refs!: {
        IconContainer: HTMLElement
    }
    @Prop({ default: '' }) private src!: string
    @Prop({ default: '' }) private strokeColor!: string
    @Prop({ default: '' }) private fillColor!: string
    @Prop({ type: Boolean }) private active!: boolean
    @Prop({ default: '' }) private tooltip!: string
    @Prop({ default: 'bottom' }) private position!: string
    @Prop({ default: 0 }) private width!: number
    @Prop({default: 0}) private height!: number

    private mounted() {
        if (this.width !== 0 && this.height !== 0) {
            const icon = this.$refs.IconContainer.getElementsByTagName('svg')[0]
            if (icon) {
                icon.setAttribute('width', this.width.toString())
                icon.setAttribute('height', this.height.toString())
            }
        }
        if (this.strokeColor) {
            this.changeStrokeColor()
        }
        if (this.fillColor) {
            this.changeFillColor()
        }
        if (this.active) {
            this.changeIfActive()
        }
    }

    @Watch('fillColor')
    private changeFillColor() {
        if (this.fillColor === '') return
        const paths = [...this.$refs.IconContainer.getElementsByTagName('svg')[0].children]
        for (const path of paths) {
            if (this.fillColor === null) {
                path.removeAttribute('fill')
            } else {
                path.setAttribute('fill', this.fillColor)
                if (path.getAttribute('stroke') !== null) {
                    path.setAttribute('stroke', this.fillColor)
                }
            }
        }
        this.changeStrokeColor()
    }

    @Watch('strokeColor')
    private changeStrokeColor() {
        if (this.strokeColor === '') return
        if (this.fillColor) return
        const paths = [...this.$refs.IconContainer.getElementsByTagName('svg')[0].children]
        for (const path of paths) {
            if (path.getAttribute('fill') !== null) {
                path.setAttribute('fill', this.strokeColor)
            }
            if (path.getAttribute('stroke') !== null) {
                path.setAttribute('stroke', this.strokeColor)
            }
        }
    }

    private changeIfStandard() {
        const paths = [...this.$refs.IconContainer.getElementsByTagName('svg')[0].children]
        for (const path of paths) {
            if (path.getAttribute('fill') !== null) {
                path.setAttribute('fill', '#1C1C1C')
            }
            if (path.getAttribute('stroke') !== null) {
                path.setAttribute('stroke', '#1C1C1C')
            }
        }
    }

    @Watch('active')
    private changeIfActive() {
        if (!this.active) {
            this.changeIfStandard()
            return
        }
        const paths = [...this.$refs.IconContainer.getElementsByTagName('svg')[0].children]
        for (const path of paths) {
            if (path.getAttribute('fill') !== null) {
                path.setAttribute('fill', '#4B970F')
            }
            if (path.getAttribute('stroke') !== null) {
                path.setAttribute('stroke', '#4B970F')
            }
        }
    }
}
</script>  

<style lang="scss" scoped>
    .Icon_Container{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon {
            display: flex;
            align-items: center;
            justify-content: center;
            &:hover{
                cursor: pointer;
            }
        }
        &:hover {
            .tooltiptext {
                visibility: visible;
                opacity: 0.9;
            }
        }
        .tooltiptext {
            pointer-events: none;
            visibility: hidden;
            width: fit-content;
            color: #fff;
            text-align: center;
            position: absolute;
            z-index: 2;
            white-space: nowrap;
            opacity: 0;
            transition: visibility 0.3s linear, opacity 0.3s linear;
            padding: 6px 8px;
            border-radius: 6px;
            background-color: rgba(51, 50, 50, 0.8);
            box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.08);
            font-family: Roboto;
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            line-height: 14px;
            &.bottom {
                top: 30px;
            }
            &.top {
                bottom: 16px;
            }
            &.left {
                right: 0;
            }
            &.right {
                left: 0;
            }
        }
    }
</style>