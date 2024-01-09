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
					:src="`https://http.cat/${number}.jpg`"
					alt=""
				/>
			</v-carousel-item>

			<v-carousel-item>
				<img
					class="main__carousel__img"
					:src="`https://http.cat/${number2}.jpg`"
					alt=""
				/>
			</v-carousel-item>

			<v-carousel-item
				><img
					class="main__carousel__img"
					:src="`https://http.cat/${number3}.jpg`"
					alt=""
				/>
			</v-carousel-item>
		</v-carousel>
	</div>
	<!-- <input v-model="number"/>
	<input v-model="number2"/>
	<input v-model="number3"/> -->
	<label for="pet-select">Choose a status code: </label>

	<select name="statusCodes" id="code-select" v-model="number" @select="chooseCode(number)">
		<template v-for="cat in array">
			<option :value="cat">{{cat}}</option>
		</template>
	</select>
	<select name="statusCodes" id="code-select" v-model="number2" @select="chooseCode(number2)">
		<template v-for="cat in array">
			<option :value="cat">{{cat}}</option>
		</template>
	</select>
	<select name="statusCodes" id="code-select" v-model="number3" @select="chooseCode(number3)">
		<template v-for="cat in array">
			<option :value="cat">{{cat}}</option>
		</template>
	</select>
	<div>
	<img :src="dog">
	</div>
</template>
<script>
import {ref, defineComponent, onErrorCaptured} from 'vue';
export default defineComponent({
	setup(){
		const number = ref("")
		const number2 = ref("")
		const number3 = ref("")
		const dog = ref(null)
		const code = ref(null)
		const array = [403, 418, 410, 502, 303, 507, 100, 103, 420, 510]
		function chooseCode(number) {
			number.value = number
		}
		function dogImages() {
			fetch("https://dog.ceo/api/breed/Affenpinscher/images/random")
				.then(async res => {
					const variable = await res.json()
					dog.value = variable.message
					console.log(variable);
				}).catch(error => {
					code.value = error.code
					console.log(error);
				}).finally(()=>{
					console.log(code.value)
					dog.value = "https://media.discordapp.net/attachments/1017130764074233958/1166781181623291975/404.png?ex=654bbca7&is=653947a7&hm=83c0b97e4760f0773029595e29e93b12801cf7a194747bb06579bb722ce8c959&=&width=867&height=693"
				})
		}
		function dogImages1() {
			/**

 * @description ggg			*/
			fetch("https://api.iwhitewolf.it/v1/auth/login", {
				method: "POST",
				credentials: 'same-origin',
				body: JSON.stringify({
					email: "bialka104b@gmail.com",
					password: "password"
				}),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(async res => {
					const variable = await res.json()
					console.log(res)
					//dog.value = variable.message
					//console.log(variable);
				}).catch(error => {
					//code.value = error.code
					console.log(error);
				}).finally(()=>{
					//console.log(code.value)
					//dog.value = "https://media.discordapp.net/attachments/1017130764074233958/1166781181623291975/404.png?ex=654bbca7&is=653947a7&hm=83c0b97e4760f0773029595e29e93b12801cf7a194747bb06579bb722ce8c959&=&width=867&height=693"
				})
		}
		dogImages()
		dogImages1()
		return {
			number, number2, number3, array, dog, code
		}
	}
})
</script>
