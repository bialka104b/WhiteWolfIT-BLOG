import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'Article',
  async setup() {
    const clients = {
      article: new NewsModule.Article('tekst')
    }

    return {
      clients
    }
  },

  toggleFavourite() {
    this.clients.article
				.toggleFavourite('http://localhost:5000/api/articles')
				.then(() => {
					console.log('działa');
				})
				.catch((error) => {
					console.log(error);
					notify(
						"WystÄpiĹ bĹÄd przy dodawaniu artykuĹu do ulubionych! SprĂłbuj ponownie.",
						"error"
					);
				});
}
});

