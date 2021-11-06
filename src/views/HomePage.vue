<template>
    <div class="MapContainer_Content">
        <MapView/>
        <MapControllers/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MapView from './MapView/MapView.vue'
import MapControllers from './MapControllers/MapControllers.vue'

@Component({
    components: {
        MapView,
        MapControllers
    }
})
export default class HomePage extends Vue {

}
</script>

<style lang="scss" scoped>
.MapContainer_Content {
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>
