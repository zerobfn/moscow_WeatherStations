<template>
    <div class="dropdown_container" ref="Dropdown" :style="{width: width}">
        <div class="header" v-if="header">{{header}}</div>
        <div class="selectbox" :class="{'collapsed': isDropdownVisible, 'onerror': onerror}"
            :id="divID"
            v-outside-click="{except: divID, callback: closeDropdown}">
            <div class="selected" :style="{'width': width, 'height': height}" @click="toggleDropdown">
                <input type="text" class="selected_text" :placeholder="placeholder"
                    v-on:input="updateValue($event.target.value)" v-model="inputValue" :readonly="readonly || notchange">
                <BaseIcon class="selected_arrow" v-if="!notchange" :src="require('!html-loader!@/assets/arrow_icon.svg')"/>
            </div>
            <div class="onerror" v-if="onerror">{{onerror}}</div>
            <div class="dropdown" :style="{width: width, top: height}" v-if="!notchange">
                <div class="item" v-for="(item, index) in getItems()"
                    :key="index" @click="selectItem(item)">
                    {{item}}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Emit, Prop } from 'vue-property-decorator'

@Component
export default class BaseSelectBox extends Vue {
    public $refs!: {
        Dropdown: HTMLElement
    }

    @Prop({ default: '' }) private header!: string
    @Prop({ default: '' }) private placeholder!: string
    @Prop({ default: '341px' }) private width!: string
    @Prop({ default: '48px' }) private height!: string
    @Prop({ default: '' }) private divID!: string
    @Prop({ default: null }) private dropdownItems!: any[]
    @Prop({ default: '' }) private value!: string
    @Prop({ default: '' }) private selectedName!: string
    @Prop({ default: '' }) private onerror!: string
    @Prop({ default: false }) private readonly!: boolean
    @Prop({ default: null }) private returnData!: any
    @Prop({ default: false }) private notchange!: any
    private isDropdownVisible = false
    private inputValue = ''

    @Watch('selectedName')
    private onchangeSelected(val: any, old: any) {
        if (val !== null && val !== old) {
            this.inputValue = val
        }
    }

    private mounted() {
        if (this.selectedName) {
            this.inputValue = this.selectedName
        }
    }

    private getItems() {
        if (this.dropdownItems) {
            if (this.dropdownItems.includes(this.inputValue)) return this.dropdownItems
            else return this.dropdownItems.filter((x: any) => x.toUpperCase().includes(this.inputValue.toUpperCase()))
        }
        return []
    }

    private setValue(value: any) {
        this.inputValue = value
    }

    private toggleDropdown() {
        if (!this.notchange) {
            this.isDropdownVisible = !this.isDropdownVisible
        }
    }

    private closeDropdown() {
        this.isDropdownVisible = false
    }

    private selectItem(item: any) {
        this.$emit('selectItem', this.returnData !== null ? { name: item, returnData: this.returnData } : { name: item })
        this.isDropdownVisible = false
    }

    private updateValue(val: any) {
        this.isDropdownVisible = true
        this.$emit('input', val)
    }
}
</script>

<style lang="scss" scoped>
input:focus {
    outline: none;
    outline-color: rgba(0, 0, 0, 0);
    outline-width: 0px;
}
.dropdown_container {
    position: relative;
    width: fit-content;
    .header {
        margin-bottom: 8px;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;
        letter-spacing: 0.02em;
        color: #878882;
    }
    .selectbox {
        position: relative;
        width: 100%;
        &.collapsed {
            .selected_arrow {
                transform: rotate(180deg);
            }
            .dropdown {
                border: 1px solid #E0E2D8;
                max-height: 120px;
            }
        }
        &.onerror {
            .selected {
                border: 1px solid #D41900;
                .selected_text {
                    color: #D41900;
                }
            }
        }
        .selected {
            display: flex;
            padding: 12px 12px 12px 16px;
            background: #F6F7F3;
            border: 1px solid #E0E2D8;
            box-sizing: border-box;
            border-radius: 6px;
            &_text {
                width: calc(100% - 60px);
                flex-grow: 1;
                font-style: normal;
                font-weight: normal;
                font-size: 14px;
                line-height: 24px;
                color: #1C1C1C;
            }
            &_arrow {
                width: 24px;
                height: 24px;
                transition: all 0.3s ease;
            }
        }
        .onerror {
            margin-top: 4px;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 20px;
            color: #D41900;
        }
        .dropdown {
            position: absolute;
            background: #F6F7F3;
            height: fit-content;
            box-sizing: border-box;
            border-radius: 6px;
            max-height: 0;
            transition: all 0.3s ease;
            overflow-y: auto;
            overflow-x: hidden;
            z-index: 3;
            .item {
                padding: 6px 16px;
                font-style: normal;
                font-weight: normal;
                font-size: 14px;
                line-height: 20px;
                color: #1C1C1C;
                &:hover {
                    cursor: pointer;
                }
            }
        }
    }
}
</style>