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
    '$root.session': {
      handler(newData, oldData) {
        this.mapInstances(newData.metadata.endpoint)
      }, deep: true
    }
  },
  beforeMount() {
    if (this.$root.session.metadata.endpoint === undefined) return
    this.mapInstances(this.$root.session.metadata.endpoint)
  },
  created() {
    if (this.$root.session.metadata.endpoint === undefined) return
    this.mapInstances(this.$root.session.metadata.endpoint)
  },
  methods: {
    deleteInstance(instanceId) {
      this.unsubscribe(instanceId)
      this.$root.request("instance", "delete", {
        id: instanceId
      })
    },
    resetInstance(instanceId) {
      this.$root.request("instance", "reset", {
        id: instanceId
      })
    },
    modifyInstance(instance) {
      this.$root.request("instance", "modify", instance)
    },
    createInstance(instance) {
      this.$root.request("instance", "create", {
        name: instance.name,
        description: instance.description,
        moduleId: instance.moduleId
      })
    },
    subscribe(instanceId) {
      if (typeof this.$root.session.subscriptions !== typeof []) {
        this.$root.session.subscriptions = [instanceId]
      } else {
        this.$root.session.subscriptions.push(instanceId)
      }
    },
    unsubscribe(instanceId) {
      let current = this.$root.session.subscriptions;
      this.$root.session.subscriptions = current.filter(i => i !== instanceId);
    },
    toggleSubscription(instance) {
      this.$root.session.subscriptions.includes(instance.id) ? this.unsubscribe(instance.id) : this.subscribe(instance.id)
      this.$root.enroll()
    },
    groupBy(xs, key) {
      return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    },
    mapInstances: function (endpoint) {
      if(typeof this.$root.session.subscriptions !== typeof [""]) {
        this.$root.session.subscriptions = []
      }
      this.subscriptions = endpoint.instances.map(instance => {
        return {
          id: instance.id,
          name: instance.name,
          description: instance.description,
          config: instance.config,
          moduleName: instance.module.name,
          active:  this.$root.session.subscriptions.includes(instance.id)
        }
      })

    }
  },
}

</script>

<template>
  <div class="element px-3 mb-2">

    <div class=" d-flex justify-content-between mb-3">
      <div>
        <h5 class="mb-0 mt-1 element-title">Instances</h5>
        <span class="text-muted small mt-0">Selected instances will be updated on the terminal page.</span>
      </div>
      <div>
        <div class="dropdown">
          <a id="manageInstances" aria-expanded="false" class="btn btn-fog mt-2" data-bs-toggle="dropdown" href="#"
             role="button">
            Manage<i class="bi bi-caret-down" style="font-size: 0.9em !important; margin-left: 0.5em;"></i>
          </a>
          <div aria-labelledby="manageInstances" class="dropdown-menu">
            <div class="dropdown-header mb-1">Instances</div>

            <div>
              <a class="dropdown-item" data-bs-target="#newInstance" data-bs-toggle="modal" href="#">
                <i class="bi bi-plus-lg"></i>Create
                <i class="bi bi-window-stack text-muted float-end"></i>
              </a>

            </div>

          </div>
          <div id="newInstance" aria-hidden="true" aria-labelledby="newInstance" class="modal  fade" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header border-fog">
                  <h5 id="" class="modal-title">New Instance</h5>
                  <a aria-label="Close" data-bs-dismiss="modal" role="button"><i class="bi bi-x-lg"></i></a>
                </div>
                <div class="modal-body ">
                  <div class="row mb-3">
                    <div class="col-sm-4">
                      <label class="col-form-label mb-0 mt-3">Model</label>
                    </div>
                    <div v-if="this.$root.session.metadata !== null" class="col-sm-8">
                      <div class="form-dropdown">
                        <i class="bi bi-caret-down"></i>
                        <select id="modelRef" v-model="this.newInstance.moduleId" class="form-select">
                          <option disabled selected value>Select a module</option>
                          <option v-for="module in this.$root.session.metadata.modules" v-bind:value="module.id">{{
                              module.name
                            }}
                          </option>
                        </select>
                      </div>
                      <div class="text-muted small mt-0">Reference model for the new instance</div>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-sm-4">
                      <label class="col-form-label mb-0" for="instanceName">Name</label>
                    </div>
                    <div class="col-sm-8">
                      <input v-model="this.newInstance.name" class="form-control" placeholder="" type="text"/>
                      <div class="text-muted small mt-0">This will identify the instance</div>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-sm-4">
                      <label class="col-form-label mb-0">Description</label>
                    </div>
                    <div class="col-sm-8">
              <textarea id="instanceDescription" v-model="this.newInstance.description" class="form-control"
                        type="text"/>
                      <div class="text-muted small mt-0">Briefly describe the function of this instance</div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer border-fog">
                  <button class="btn btn-fog btn-md" data-bs-dismiss="modal" type="button"
                          v-on:click="createInstance(this.newInstance)">Create Instance
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-for="(modules, name) in this.groupBy(this.subscriptions, 'moduleName')">
      <h6 class="pb-0 px-1">{{ name }}</h6>
      <div class="flex-grid mb-2">
        <div v-for="instance in modules" class="instance"
             v-bind:class="instance.active?'instanceActive':''">
          <div class="mb-0 d-flex justify-content-between align-items-start">
            <a href="#" class="d-flex align-items-start" v-on:click="toggleSubscription(instance)">
              <i class="bi"
                 v-bind:class="instance.active?'bi-check-circle-fill':'bi-circle'"></i>
              <div class="mx-2">
                <div>{{ instance.name }}</div>
                <div class="text-muted small">{{ instance.description }}</div>
              </div>
            </a>

            <div class="dropdown" style="z-index: 1;">
              <a id="dropdownMenuLink" aria-expanded="false" class="" data-bs-toggle="dropdown" href="#"
                 role="button">
                <i class="bi bi-three-dots"></i>
              </a>
              <div aria-labelledby="dropdownMenuLink" class="dropdown-menu instance-dropdown">
                <div class="dropdown-header mb-1">Endpoint</div>
                <div><a class="dropdown-item" href="#" v-on:click="toggleSubscription(instance)"><i class="bi"
                                                                                                    v-bind:class=" instance.active?'bi-toggle-on':'bi-toggle-off'"></i>{{
                    instance.active ? 'Unsubscribe' : 'Subscribe'
                  }}<i class="bi bi-lightning-charge text-muted float-end"></i></a></div>
                <div class="dropdown-header my-1">Instance</div>
                <div><a class="dropdown-item" data-bs-toggle="modal" href="#"
                        v-bind:data-bs-target="`#${instance.id}`"><i class="bi bi-pencil"></i>Modify<i
                    class="bi bi-window-stack text-muted float-end"></i></a></div>
                <div><a class="dropdown-item" href="#" v-on:click="resetInstance(instance.id)"><i
                    class="bi bi-arrow-repeat"></i>Reset<i class="bi bi-lightning-charge text-muted float-end"></i></a>
                </div>
                <div><a class="dropdown-item" href="#" v-on:click="deleteInstance(instance.id)"><i
                    class="bi bi-trash"></i>Delete<i class="bi bi-lightning-charge text-muted float-end"></i></a></div>

              </div>
            </div>
          </div>
          <div v-bind:id="instance.id" aria-hidden="true" aria-labelledby="exampleModalLabel" class="modal fade"
               tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 id="exampleModalLabel" class="modal-title">Modify Instance</h5>

                  <a aria-label="Close" data-bs-dismiss="modal" role="button"><i class="bi bi-x-lg"></i></a>
                </div>
                <div class="modal-body">
                  <div class="row mb-3">
                    <div class="col-sm-4">
                      <label class="col-form-label mb-0" for="instanceName">Name</label>
                    </div>
                    <div class="col-sm-8">
                      <input id="instanceName" v-model="instance.name" class="form-control" placeholder="" type="text"/>
                      <div class="text-muted small mt-0">This will identify the instance</div>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-sm-4">
                      <label class="col-form-label mb-0">Description</label>
                    </div>
                    <div class="col-sm-8">
              <textarea id="instanceDescription" v-model="instance.description" class="form-control"
                        type="text"/>
                      <div class="text-muted small mt-0">Briefly describe the function of this instance</div>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-sm-4">
                      <label class="col-form-label mb-0">Description</label>
                    </div>
                    <div class="col-sm-8">
              <textarea id="instanceDescription" v-model="instance.config" class="form-control"
                        style="white-space: pre-wrap;" type="text"/>
                      <div class="text-muted small mt-0">Modify the instance configuration</div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button class="btn btn-fog btn-md px-4 py-1" data-bs-dismiss="modal" type="button"
                          v-on:click="modifyInstance(instance)">Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>

  </div>


  <!-- Modal -->

</template>

<style scoped>
.flex-grid {
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  flex-wrap: wrap;
}

.instance-dropdown {
  transform: translate3d(calc(-100% - 4px), -2px, 0) !important;
}

.dropdown-item i:first-child {
  margin-right: 0.75em;
}

.dropdown-item i {
  width: 1em;
}

.form-dropdown .form-select {
  background-image: none;
}

.form-dropdown i {
  position: relative;
  top: 2em;
  z-index: -1;
  left: calc(100% - 2em);
  display: block;
  visibility: visible;
}

.instance {
  padding: 8px 12px;
  background: var(--bs-fog);
  border-radius: 10px;
  width: calc(33% - 1px);
  border: 1px solid transparent;
}

.instanceActive {
  color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.25);
}
</style>
