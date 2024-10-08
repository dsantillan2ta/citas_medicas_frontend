<template>
  <div>
    <v-img
      class="mx-auto my-6"
      max-width="228"
      src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
    ></v-img>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div
        class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
      >
        New Password
      </div>
      <v-text-field
        v-model="new_password"
        :append-inner-icon="visible_password ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible_password ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your new password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible_password = !visible_password"
        :disabled="disabled"
        :loading="loading"
        @input="debounceCheckPasswords"
      ></v-text-field>

      <div
        class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
      >
        Confirm New Password
      </div>
      <v-text-field
        v-model="confirm_password"
        :append-inner-icon="visible_confirm ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible_confirm ? 'text' : 'password'"
        density="compact"
        placeholder="Confirm your new password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible_confirm = !visible_confirm"
        :disabled="disabled"
        :loading="loading"
        @input="debounceCheckPasswords"
      ></v-text-field>

      <v-btn
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        block
        @click="recover_password"
        :disabled="!isPasswordValid"
      >
        Reset
      </v-btn>
    </v-card>
  </div>
</template>

<script>
import { authService } from "@/services/authService";

export default {
  data: () => ({
    disabled: false,
    loading: false,
    visible_password: false,
    visible_confirm: false,
    new_password: "",
    confirm_password: "",
    debounceTimeout: null,
    isPasswordValid: false,
    token: new URLSearchParams(window.location.search).get("token"),
  }),
  methods: {
    debounceCheckPasswords() {
      if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout);
      }

      this.debounceTimeout = setTimeout(() => {
        this.checkPasswords();
      }, 500);
    },

    checkPasswords() {
      if (this.new_password && this.confirm_password) {
        this.isPasswordValid =
          this.new_password === this.confirm_password
            ? true
            : this.$emit("notify", {
                message: "Inputs Password Don't Match",
                ok: false,
                show: true,
              });
      }
    },

    async recover_password() {
      try {
        const data = {
          newPassword: this.new_password,
          confirmPassword: this.confirm_password,
        };

        const response = await authService.reset_password(this.token, data);

        const message = !response.success
          ? "This Link has Expired or been used"
          : "Your Password has been reset successfully";
        const state = response.code;

        this.$emit("recover-success", {
          tittle: response.message,
          message: message,
          state: state,
        });
      } catch (error) {
        this.$emit("notify", { message: error.message, ok: false, show: true });
      } finally {
        this.loading = false;
        this.disabled = false;
      }
    },
  },
};
</script>
