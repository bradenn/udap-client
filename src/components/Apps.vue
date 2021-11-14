<script>
import Board from "./partials/Board.vue";
import VueQrcode from 'vue-qrcode'
export default {
  components: {Element, Board, VueQrcode},
  data() {
    return {}
  },
  created() {

  },
  methods: {},
}
</script>

<template>
  <div class="apps">
    <div class="app primary">
      <a  href="#" data-bs-target="#showWifiQR" data-bs-toggle="modal">
        <div>
          <i class="bi bi-router-fill"></i>
        </div>
      </a>
      <span>Wi-Fi</span>
    </div>

    <div class="modal-exclusive">
      <div id="showWifiQR" aria-hidden="true" aria-labelledby="newInstance" class="modal fade" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered" style="position:relative; top: -20%;">
          <div class="modal-content">
            <div class="modal-header border-0 my-0 py-2 pb-0">
              <span>Join "bmni" Wi-Fi network</span>
              <a aria-label="Close" href="#" class="text-primary" data-bs-dismiss="modal" role="button">Done</a>
            </div>
            <div class="modal-body d-flex justify-content-around">
              <vue-qrcode value="WIFI:T:WPA;S:bmni;P:Zaq1xsw2;;" errorCorrectionLevel='H' :color="{ dark: '#ffffff2F', light: '#00000000' }" :quality=0.5 :scale=16 :margin=0 type="image/png" class="w-100"></vue-qrcode>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<style>
.apps {
  display: flex;
  gap: 2em;
  margin-top: 1em;
}
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;

}

.app:hover {
  color: inherit;
}

.app span {
  margin-top: 0.33em;
  font-size: 12px;
  font-weight: 400;
}

.app div {
  display: flex;
  width: 5em;
  height: 5em;
  border-radius: 16px;
  align-items: center;
  justify-content: space-around;
  background-color: var(--bs-primary);
  box-shadow: inset 0 0 12px rgba(0, 0, 0, 0.22), 0 0 12px rgba(0, 0, 0, 0.11);
}

.app div > i{
  font-size: 1.4em;
}



</style>
