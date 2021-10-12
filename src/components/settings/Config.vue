<script>
export default {
  components: {},
  data() {
    return {
      grid: null,
      subscriptions: null,
      local: [],
      newInstance: {moduleId: "", name: "", description: ""}
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
    createInstance() {
      const config = {
        headers: {Authorization: `Bearer ${this.$sessionId}`}
      }
      console.log(this.newInstance)
      this.$http.post(`http://${this.$host}/instances`, this.newInstance, config).then(this.$root.enroll).catch((err) => console.log(err))
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
    <div class=" d-flex justify-content-between mb-2">
      <div>
        <h5 class="mb-0 mt-1">Instance Subscriptions</h5>
        <span class="text-muted small mt-0">Selected instances will be updated on the terminal page.</span>
      </div>
      <div>
        <div class="btn-group">
          <a href="#" class="btn btn-fog btn-micro" data-bs-toggle="modal" data-bs-target="#newInstance">New
            Instance</a>
          <a href="#" class="btn btn-fog btn-micro" data-bs-toggle="modal" data-bs-target="#manageInstances">Manage
            Instances</a>
        </div>
      </div>
    </div>

    <div v-if="this.$root.metadata !== null" class="mb-2">
      <div class="flex-grid">
        <div class="element instance px-3"
             v-for="instance in this.subscriptions"
             v-bind:class="instance.active?'instanceActive':''"
             v-on:click="this.toggleInstance(instance)">
          <h6 class="mb-0 d-flex justify-content-between">{{ instance.moduleName }}<i class="bi"
                                                                                      v-bind:class="instance.active?'bi-check-circle-fill':'bi-circle'"></i>
          </h6>
          <div class="d-flex justify-content-between">
            <div class="text-muted">{{ instance.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="newInstance" tabindex="-1" aria-labelledby="newInstance" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header border-fog">
          <h5 class="modal-title" id="exampleModalLabel">New Instance</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body ">
          <div class="row mb-3">
            <div class="col-sm-4">
              <label class="col-form-label mb-0">Model</label>
            </div>
            <div class="col-sm-8" v-if="this.$root.metadata !== null">
              <select class="form-select" v-model="this.newInstance.moduleId" id="modelRef">
                <option disabled selected value>Select a module</option>
                <option v-for="module in this.$root.metadata.modules" v-bind:value="module.id">{{
                    module.name
                  }}
                </option>
              </select>
              <div class="text-muted small mt-0">Reference model for the new instance</div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-sm-4">
              <label for="instanceName" class="col-form-label mb-0">Name</label>
            </div>
            <div class="col-sm-8">
              <input type="text" class="form-control" id="instanceName" v-model="this.newInstance.name" placeholder=""/>
              <div class="text-muted small mt-0">This will identify the instance</div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-sm-4">
              <label class="col-form-label mb-0">Description</label>
            </div>
            <div class="col-sm-8">
              <textarea type="text" class="form-control" id="instanceDescription"
                        v-model="this.newInstance.description"/>
              <div class="text-muted small mt-0">Briefly describe the function of this instance</div>
            </div>
          </div>
        </div>
        <div class="modal-footer border-fog">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" v-on:click="createInstance">Create Instance
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="manageInstances" tabindex="-1" aria-labelledby="newInstance" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header border-fog">
          <h5 class="modal-title">Manage Instances</h5>
          <a data-bs-dismiss="modal"></a>
        </div>
        <div class="modal-body " v-if="this.$root.metadata !== null">
          <div class="form-control mb-2 px-3 py-2 d-flex justify-content-between align-items-center" v-for="instance in this.$root.metadata.endpoint.instances">
            <div>
              <h6 class="mb-0 ">{{ instance.name }}</h6>
              <div class="small text-muted">{{ instance.description }}</div>
            </div>
            <div>
              <a href="#" v-on:click="this.$root.sendReset(instance.id)">Reset</a>
            </div>
          </div>
        </div>
        <div class="modal-footer border-fog">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>

        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.flex-grid {
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  flex-wrap: wrap;
}

.flex-gap {
  gap: 0.5em;
}

.instance {
  border-radius: 10px;
  width: calc(50% - 4px);
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
