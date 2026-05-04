<template>
  <div v-if="show" class="modal-overlay d-flex justify-content-center align-items-center">
    <div class="modal-content border-0 shadow rounded-4 p-4">
      <div class="modal-header border-0 mb-2">
        <h3 class="modal-title fs-4 fw-bold text-danger d-flex align-items-center gap-2">
          <span class="material-symbols-outlined">warning</span>
          Confirm Deletion
        </h3>
      </div>
      <div class="modal-body text-secondary fs-5">
        <p>Are you sure you want to delete this employee?</p>
      </div>
      <div class="modal-footer border-0 mt-3 d-flex justify-content-end gap-3">
        <button class="btn btn-light px-4 py-2 rounded-3" @click="handleCancel">Cancel</button>
        <button class="btn btn-danger px-4 py-2 rounded-3 d-flex align-items-center gap-2" @click="handleConfirm">
          <span class="material-symbols-outlined text-[20px]">delete</span>
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeletePopup',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  emits: ['cancel', 'confirm'],
  methods: {
    handleCancel() {
      this.$emit('cancel');
    },
    handleConfirm() {
      this.$emit('confirm');
    }
  }
}
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1050;
}
.modal-content {
  background: white;
  width: 100%;
  max-width: 450px;
}
</style>
