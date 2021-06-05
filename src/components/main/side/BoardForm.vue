<template>
  <div>
    <b-button
      v-b-modal.modal-footer-cu
      block
      variant="outline-dark"
      style="width: 100%"
      >보드 생성하기</b-button
    >

    <b-modal
      id="modal-footer-cu"
      title="Board"
      button-size="sm"
      @ok="createBoard"
    >
      <template #modal-header="{}">
        <h5>Board</h5>
      </template>

      <b-form @reset="onReset">
        <b-form-group
          id="input-group-1"
          label="Board Title:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.title"
            type="text"
            placeholder="Enter Board Title"
            autocomplete="off"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Board Description:"
          label-for="input-2"
          class="mb-2"
        >
          <b-form-input
            id="input-2"
            v-model="form.content"
            placeholder="Board Description"
            autocomplete="off"
            required
          ></b-form-input>
        </b-form-group>
      </b-form>

      <template #modal-footer="{ ok, cancel }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button size="sm" variant="primary" @click="ok()">생성하기</b-button>
        <b-button size="sm" variant="danger" @click="cancel()"> 취소 </b-button>
      </template>
    </b-modal>

    <b-modal id="BoardResultModal" cancel-only
      >{{ resContent }}
      <template #modal-footer="{ cancel }">
        <b-button size="sm" variant="danger" @click="cancel()"> 닫기 </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { createBoard } from '@/api/board';

export default {
  name: 'BoardForm',
  props: {
    team: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {
        title: '',
        content: '',
        teamId: this.team.id,
      },
      resContent: '',
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset() {
      this.form.title = '';
      this.form.content = '';
    },
    async createBoard() {
      try {
        this.resContent = '보드가 생성 되었습니다.';
        let result = await createBoard(this.form);
        console.log(result);
      } catch (e) {
        if (e.response.status == 409) {
          this.resContent = '이미 보드를 생성하셨습니다.';
        }
      }

      await this.$root.$emit('bv::show::modal', 'BoardResultModal');

      await this.$store.dispatch('refreshSetting');
    },
  },
  mounted() {
    this.$root.$on('bv::modal::show', () => {
      this.onReset();
    });
  },
};
</script>
