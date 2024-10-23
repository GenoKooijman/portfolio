import { ref } from 'vue';

export const useInfiniteScroll = (loadMoreCallback) => {
  const loadMoreTrigger = ref(null);
  const page = ref(1);

  const setupIntersectionObserver = () => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        page.value += 1;
        loadMoreCallback(page.value);
      }
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    });

    if (loadMoreTrigger.value) {
      observer.observe(loadMoreTrigger.value);
    }
  };

  return { loadMoreTrigger, setupIntersectionObserver, page };
};