<template>
  <span>
    <b-link v-b-modal.modal-edit block><b-icon icon="pencil"></b-icon></b-link>

    <b-modal id="modal-edit" title="Team" button-size="sm" @ok="modifyTeam">
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
        <b-button size="sm" variant="primary" @click="ok()">수정하기</b-button>
        <b-button size="sm" variant="danger" @click="cancel()"> 취소 </b-button>
      </template>
    </b-modal>

    <b-modal id="TeamEditResult" cancel-only
      >{{ resContent }}
      <template #modal-footer="{ cancel }">
        <b-button size="sm" variant="danger" @click="cancel()"> 닫기 </b-button>
      </template>
    </b-modal>
  </span>
</template>

<script>
import { editTeam } from '@/api/team';

export default {
  name: 'TeamEditForm',
  data() {
    return {
      form: {
        id: '',
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
    async modifyTeam() {
      try {
        await editTeam(this.form);
        this.resContent = '팀이 수정 되었습니다.';
      } catch (e) {
        if (e.response.status == 409) {
          this.resContent = '수정 도중 에러가 났습니다.';
        }
      }
      // 결과창 모달 호출
      this.$root.$emit('bv::show::modal', 'TeamEditResult');

      let selectedTeamIdx = await this.$store.state.page.selectedTeamIdx;
      let selectedBoardIdx = await this.$store.state.page.selectedBoardIdx;

      await this.$store.dispatch('setSelectedTeamIdx', selectedTeamIdx);
      await this.$store.dispatch('setSelectedBoardIdx', selectedBoardIdx);
      await this.$store.dispatch('refreshSetting');
    },
  },
  mounted() {
    this.$root.$on('bv::modal::show', async () => {
      this.onReset();

      let selectedTeam = await this.$store.state.page.selectedTeam;
      this.form.id = selectedTeam.id;
      this.form.name = selectedTeam.name;
      this.form.description = selectedTeam.description;
    });
  },
};
</script>
