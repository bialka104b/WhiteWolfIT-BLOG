<template>
	<div class="main__aboutMe">
		<h1 class="main__title">Producent oprogramowania</h1>
		<button class="main__btn">Poznaj nas!</button>
		<h2 class="main__small-title">Nasza Firma</h2>
		<p class="main__paraf">
			Witaj na stronie naszej firmy webdeveloperskiej! Jesteśmy zespołem
			pasjonatów, którzy zajmują się tworzeniem profesjonalnych stron
			internetowych i aplikacji internetowych. Naszą misją jest
			dostarczanie innowacyjnych i funkcjonalnych rozwiązań online, które
			pomagają naszym klientom osiągnąć sukces w cyfrowym świecie.
		</p>
	</div>

	<div class="main__section__technologies">
		<h1 class="main__title main__section__technologies__title">
			Technologie z których korzystamy
		</h1>
		<v-carousel :show-arrows="false" class="main__carousel__custom">
			<v-carousel-item>
				<img
					class="main__carousel__img"
					src="../assets/js.png"
					alt=""
				/>
			</v-carousel-item>

			<v-carousel-item>
				<img
					class="main__carousel__img"
					src="../assets/node-js.png"
					alt=""
				/>
			</v-carousel-item>

			<v-carousel-item
				><img
					class="main__carousel__img"
					src="../assets/mongodb.png"
					alt=""
				/>
			</v-carousel-item>
		</v-carousel>
	</div>
</template>
