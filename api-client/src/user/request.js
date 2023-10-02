const userUpdateRequest = (id, email, first_name, last_name, phone_number) => {
	return {
		id,
		email,
		first_name,
		last_name,
		phone_number,
	};
};

const changePasswordRequest = (id, current_password, password) => {
	return {
		id,
		current_password,
		password,
		password_confirmation: password,
	};
};

export default {
	userUpdateRequest,
	changePasswordRequest,
};
