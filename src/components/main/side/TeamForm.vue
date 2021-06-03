<template>
  <div>
    <b-button
      v-b-modal.modal-footer-sm
      block
      variant="outline-dark"
      style="width: 100%"
      >팀 생성하기</b-button
    >

    <b-modal
      id="modal-footer-sm"
      title="Team"
      button-size="sm"
      @ok="createTeam"
    >
      <template #modal-header="{}">
        <h5>Team</h5>
      </template>

      <b-form @reset="onReset">
        <b-form-group
          id="input-group-1"
          label="Team Title:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.name"
            type="text"
            placeholder="Enter Team Title"
            autocomplete="off"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Team Description:"
          label-for="input-2"
          class="mb-2"
        >
          <b-form-input
            id="input-2"
            v-model="form.description"
            placeholder="Team Description"
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

    <b-modal id="resultModal" cancel-only
      >{{ resContent }}
      <template #modal-footer="{ cancel }">
        <b-button size="sm" variant="danger" @click="cancel()"> 닫기 </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { createTeam, getTeams } from '@/api/team';

export default {
  name: 'TeamForm',
  data() {
    return {
      form: {
        name: '',
        description: '',
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
      this.form.name = '';
      this.form.description = '';
    },
    async createTeam() {
      try {
        await createTeam(this.form);
        this.resContent = '팀이 생성 되었습니다.';

        // 결과창 모달 호출
        this.$root.$emit('bv::show::modal', 'resultModal');

        const { data } = await getTeams();
        await this.$store.dispatch('setBoards', data);
      } catch (e) {
        if (e.response.status == 409) {
          this.resContent = '이미 팀을 생성하셨습니다.';
          this.$root.$emit('bv::show::modal', 'resultModal');
        }
      }
    },
  },
  mounted() {
    this.$root.$on('bv::modal::show', () => {
      this.onReset();
    });
  },
};
</script>
