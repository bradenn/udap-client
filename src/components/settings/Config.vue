<script>
export default {
  components: {},
  data() {
    return {
      grid: null,
      subscriptions: null,
      local: []
    }
  },
  watch: {
    '$instances'(newVar) {
      console.log("Instance")
    },
    '$root.metadata'(newVar) {
      if (newVar === null) return
      this.mapInstances(newVar.endpoint)
    },
  },
  created() {
    if (this.$root.metadata === null) return
    this.mapInstances(this.$root.metadata.endpoint)
  },
  methods: {
    toggleInstance: function (instance) {
      instance.active ? this.removeInstance(instance.id) : this.addInstance(instance.id)
      this.$root.enroll()
    },
    addInstance: function (id) {
      this.$addInstance(id)
    },
    removeInstance: function (id) {
      this.$removeInstance(id)
    },
    isActive(id) {
      return this.$instances.includes(id)
    },
    mapInstances: function (endpoint) {
      if (endpoint === null) {
        return
      }
      this.subscriptions = endpoint.instances.map(instance => {
        return {
          id: instance.id,
          name: instance.name,
          description: instance.description,
          moduleName: instance.module.name,
          active: this.isActive(instance.id)
        }
      })

    }
  },
}


</script>

<template>

  <div class="element px-3 mb-2">
    <div class=" d-flex justify-content-between">
      <div>
      <h5 class="mb-2">Instance Subscriptions</h5>
        <span class="text-muted">Selected instances will </span>
      </div>
      <a href="#" class="btn btn-fog btn-micro">New Instance</a>
    </div>


    <div v-if="this.$root.metadata !== null" class="mb-2">
      <div class="d-flex flex-wrap flex-gap">
        <div class="element col-4 instance px-3"
             v-for="instance in this.subscriptions"
             v-bind:class="instance.active?'instanceActive':''"
             v-on:click="this.toggleInstance(instance)">
          <h6 class="mb-0 d-flex justify-content-between">{{ instance.moduleName }}<i class="bi"
                                                                                      v-bind:class="instance.active?'bi-check-circle-fill':'bi-circle'"></i>
          </h6>
          <div class="text-muted">{{ instance.name }}</div>
          <div class="text-muted">{{ instance.description }}</div>
        </div>
      </div>
    </div>
  </div>

  <div class="element px-3">
    <h5 class="mb-2 d-flex justify-content-between">Modules
      <a href="#" class="btn btn-fog btn-micro">New Instance</a>
    </h5>

    <div v-if="this.$root.metadata !== null" class="mb-2">
      <div class="d-flex flex-wrap flex-gap">
        <div class="element col-4 instance px-3"
             v-for="instance in this.subscriptions"
             v-bind:class="instance.active?'instanceActive':''"
             v-on:click="this.toggleInstance(instance)">
          <h6 class="mb-0 d-flex justify-content-between">{{ instance.moduleName }}<i class="bi"
                                                                                      v-bind:class="instance.active?'bi-check-circle-fill':'bi-circle'"></i>
          </h6>
          <div class="text-muted">{{ instance.name }}</div>
          <div class="text-muted">{{ instance.description }}</div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

.flex-gap {
  gap: 0.5em;
}

.instance {
  border-radius: 10px;
  border: 2px solid transparent;
}

.btn-micro {

  /*line-height: 1em;*/
  color: var(--bs-gray-500);
  font-size: 0.75rem;
  font-weight: 500;
  text-align: center;
  vertical-align: middle;
}

.instanceActive {
  color: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(255, 255, 255, 0.25);
}
</style>
