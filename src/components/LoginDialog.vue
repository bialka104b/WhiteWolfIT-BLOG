<script setup>
import { ref } from "vue";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const emit = defineEmits(["onSuccess"]);
const formValid = ref(false);
const loading = ref(false);
const router = useRouter();

const email = ref("");
const emailRules = [
	(value) => {
		if (!value) return "Email is required.";
		return true;
	},
	(value) => {
		if (/.+@.+\..+/.test(value) === false) return "Email must be valid.";
		return true;
	}
];

const password = ref("");
const passwordRules = [
	(value) => {
		if (!value) return "Password is required.";
		return true;
	}
];
const passwordVisible = ref(false);

// Login logic
const userStore = useUserStore();
const login = async () => {
	loading.value = true;

	await userStore.login(email.value, password.value);

	if (userStore.userLoggedIn) {
		await router.push({ name: "admin" });
		toast.success("You have logged into your account");
		emit("onSuccess");
	}

	loading.value = false;
};
</script>

<template>
	<div id="LoginDialog">
		<v-dialog
			transition="dialog-top-transition"
			width="auto"
			min-width="400"
			max-width="100%"
		>
			<v-card elevation="0" class="pt-2 pb-4">
				<v-card-text>
					<v-form v-model="formValid">
						<span class="text-body-2 d-block mb-1"
							>Email address</span
						>
						<v-text-field
							v-model="email"
							placeholder="Email"
							type="email"
							:rules="emailRules"
							required
							variant="outlined"
							prepend-inner-icon="mdi-account-outline"
							class="mb-3"
							clearable
							hide-details="auto"
							density="compact"
						/>

						<span class="text-body-2 d-block mb-1">Password</span>
						<v-text-field
							v-model="password"
							placeholder="Password"
							:type="passwordVisible ? 'text' : 'password'"
							:rules="passwordRules"
							required
							variant="outlined"
							prepend-inner-icon="mdi-lock-outline"
							@keyup.enter="login"
							hide-details="auto"
							density="compact"
						>
							<template #append-inner>
								<v-btn
									flat
									size="small"
									icon
									@click="passwordVisible = !passwordVisible"
								>
									<v-icon
										:icon="
											passwordVisible
												? 'mdi-eye-off-outline'
												: 'mdi-eye-outline'
										"
									/>
								</v-btn>
							</template>
						</v-text-field>
					</v-form>

					<v-btn
						variant="tonal"
						color="primary"
						size="large"
						class="mt-5"
						block
						@click="login"
						:loading="loading"
						:disabled="loading || !email || !password || !formValid"
					>
						Sign in
					</v-btn>
				</v-card-text>
			</v-card>
		</v-dialog>
	</div>
</template>
