<template>
  <section class="news">
    <h2>Новости</h2>
    <div class="news-cards">
      <div class="news-card" v-for="newsItem in news" :key="newsItem.id">
        <img :src="newsItem.image" :alt="newsItem.title" class="news-image" />
        <p class="news-date">{{ newsItem.date }}</p>
        <h3>{{ newsItem.title }}</h3>
        <p class="news-description">{{ newsItem.description }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "News",
  data() {
    return {
      news: [
        {
          id: 1,
          date: "11.04.2005",
          title: "Marussia Unveils New Supercar Concept at Geneva Motor Show",
          description:
              "Russian luxury car manufacturer Marussia has stunned the automotive world with the unveiling of its latest supercar concept at the Geneva Motor Show.",
          image: require('@/assets/car-image.png')
        },
        {
          id: 2,
          date: "11.04.2005",
          title: "Marussia Partners with Formula 1 Team to Develop High-Performance Road Car",
          description:
              "Marussia has announced a partnership with the Renault F1 Team to develop a new high-performance road car.",
          image: require('@/assets/car-image.png')
        },
        {
          id: 3,
          date: "11.04.2005",
          title: "Marussia Expands Global Presence with New Dealership in Dubai",
          description:
              "Marussia has announced the opening of its first dealership in Dubai, marking a significant expansion of its global presence.",
          image: require('@/assets/car-image.png')
        },
      ],
    };
  },
};
</script>

<style scoped>
.news {
  text-align: center;
  background-color: black;
  color: white;
  padding: 50px 0;
}

.news h2 {
  font-size: 3vw;
  margin-bottom: 40px;
}

.news-cards {
  display: flex;
  justify-content: center;
  gap: 3vw;
}

.news-card {
  width: 25vw;
  text-align: left;
  color: white;
}

.news-image {
  width: 100%;
  height: auto;
  margin-bottom: 15px;
}

.news-date {
  font-size: 0.9vw;
  color: gray;
  margin-bottom: 10px;
}

.news h3 {
  font-size: 1.4vw;
  margin-bottom: 10px;
}

.news-description {
  font-size: 1vw;
  color: white;
}
</style>
