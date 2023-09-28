<template>
	<div
		id="LoadingScreen"
		class="d-flex align-center justify-center flex-column w-100 h-100 text-center px-3"
	>
		<v-progress-circular indeterminate :size="36" :width="2" />

		<p class="text-body-1 mt-5">
			We're loading your app right now. Please wait
		</p>

		<p class="text-caption mt-3">WhiteWolf.IT &copy; 2023</p>
	</div>
</template>
