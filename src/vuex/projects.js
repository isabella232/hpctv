const state = {
  headerTileCopy: 'Go behind the screens and explore what researchers around the country are working on.',
  featuredProjects: [
    {
      name: 'Wind Forecast Improvement',
      heroImage: '/static/img/featured-projects/wind-forecast.jpg',
      statData: [
        {
          statName: 'Core Hours',
          statNumber: 10000000,
          iconPath: '/static/icon/core-hours-icon.svg'
        }
        // {
        //   statName: 'Jobs',
        //   statNumber: 55,
        //   iconPath: '/static/icon/jobs-icon.svg'
        // },
        // {
        //   statName: 'Petaflops',
        //   statNumber: 55,
        //   iconPath: '/static/icon/performance-icon.svg'
        // }
      ],
      mainContent: [
        {
          title: 'From Gust Till Dawn: Wind Forecasting',
          body: `<p>The Columbia River Basin in Oregon is a major wind energy supplier to the West Coast. While wind is clean and renewable, variable weather conditions cause swings in the electrical power that wind farms produce. These fluctuations create a need for load balancing, or the dynamic storage and release of electrical power, which can be inefficient.</p> 

          <p>The weather models that predict the wind’s behavior are often one-dimensional, limiting important details needed to more accurately predict wind patterns. With Cheyenne’s help, researchers can run models that account for both vertical and horizontal changes to better show how winds behave in complex terrain like Oregon. </p>

          <p>Through this project, researchers aim to improve short-term wind forecasting models and atmospheric understanding for better wind-energy efficiency and operations in complex terrain, such as coastlines, mountains, and canyons.</p>`,
          media: '/static/img/modal-placeholder.jpg'
        },
        {
          title: 'Reliable Energy, Long-Term Savings',
          body: `<p>Wind energy has existed in the US from as early as 1850. And though clean energy has advanced over the years—from powering local utility networks during WWII to providing enough power for more than two million American homes by 2005*—to rely on it, we must more accurately predict it.</p>  

          <p><strong> Wait, we can’t rely on wind energy?</strong> We can. But wind changes, so sometimes wind turbines create a lot of energy, other times none at all. We need to be able to forecast those fluctuations. </p>

          <p><strong> Why?</strong> Wind facilities need efficient “Electrical Load Balancing,” a dynamic storage and release of electrical power when the wind starts and stops, respectively.</p>

          <p><strong> Data can improve that?</strong> Yes! Our data informs better techniques to more accurately predict wind patterns. More accurate predictions mean better load balancing. </p>

          <p><strong> What does that mean for me?</strong> Efficient load balancing and strategic wind farm placement mean long-term reliable wind energy and cost savings for businesses and individuals.  </p>

         <p> Source:<br>
         <a href="http://www.renewableenergyworld.com/ugc/articles/2014/11/history-of-wind-turbines.html"> *Shahan, Z. (2014, November 21). History of Wind Turbines. Retrieved December 05, 2017,</a></p>`,
          media: '/static/video/wind-turbines.mp4'
        }
      ]
    },
    {
      name: 'Understanding heliospheric Weather',
      heroImage: '/static/img/featured-projects/heliosphere.jpg',
      statData: [
        {
          statName: 'Core Hours',
          statNumber: 10000,
          iconPath: '/static/icon/core-hours-icon.svg'
        },
        {
          statName: 'Jobs',
          statNumber: 55,
          iconPath: '/static/icon/jobs-icon.svg'
        },
        {
          statName: 'Petaflops',
          statNumber: 55,
          iconPath: '/static/icon/performance-icon.svg'
        }
      ],
      mainContent: [
        {
          title: 'Slide 1 Title',
          body: 'Slide 1 body.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate, voluptas iusto accusamus quia impedit error odit dolores nulla officiis cum esse quidem repellat repudiandae sapiente expedita quibusdam exercitationem, placeat deleniti? Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum placeat praesentium dignissimos voluptatum facere possimus itaque voluptas mollitia quam omnis minima illo animi iste, rem laboriosam laudantium. Maxime, iure repudiandae!',
          media: '/static/img/modal-placeholder.jpg'
        },
        {
          title: 'Slide 2 Title',
          body: 'Slide 2 body.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate, voluptas iusto accusamus quia impedit error odit dolores nulla officiis cum esse quidem repellat repudiandae sapiente expedita quibusdam exercitationem, placeat deleniti? Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum placeat praesentium dignissimos voluptatum facere possimus itaque voluptas mollitia quam omnis minima illo animi iste, rem laboriosam laudantium. Maxime, iure repudiandae!',
          media: 'https://www.w3schools.com/html/mov_bbb.mp4'
        },
        {
          title: 'Slide 3 Title',
          body: 'Slide 3 body.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate, voluptas iusto accusamus quia impedit error odit dolores nulla officiis cum esse quidem repellat repudiandae sapiente expedita quibusdam exercitationem, placeat deleniti? Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum placeat praesentium dignissimos voluptatum facere possimus itaque voluptas mollitia quam omnis minima illo animi iste, rem laboriosam laudantium. Maxime, iure repudiandae!',
          media: '/static/img/modal-placeholder.jpg'
        }
      ]
    },
    {
      name: 'Predicting Climate Extremes',
      heroImage: '/static/img/featured-projects/climate-extremes.jpg',
      statData: [
        {
          statName: 'Core Hours',
          statNumber: 10000,
          iconPath: '/static/icon/core-hours-icon.svg'
        },
        {
          statName: 'Jobs',
          statNumber: 55,
          iconPath: '/static/icon/jobs-icon.svg'
        },
        {
          statName: 'Petaflops',
          statNumber: 55,
          iconPath: '/static/icon/performance-icon.svg'
        }
      ],
      mainContent: [
        {
          title: 'Slide 1 Title',
          body: 'Slide 1 body.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate, voluptas iusto accusamus quia impedit error odit dolores nulla officiis cum esse quidem repellat repudiandae sapiente expedita quibusdam exercitationem, placeat deleniti? Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum placeat praesentium dignissimos voluptatum facere possimus itaque voluptas mollitia quam omnis minima illo animi iste, rem laboriosam laudantium. Maxime, iure repudiandae!',
          media: '/static/img/modal-placeholder.jpg'
        },
        {
          title: 'Slide 2 Title',
          body: 'Slide 2 body.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate, voluptas iusto accusamus quia impedit error odit dolores nulla officiis cum esse quidem repellat repudiandae sapiente expedita quibusdam exercitationem, placeat deleniti? Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum placeat praesentium dignissimos voluptatum facere possimus itaque voluptas mollitia quam omnis minima illo animi iste, rem laboriosam laudantium. Maxime, iure repudiandae!',
          media: 'https://www.w3schools.com/html/mov_bbb.mp4'
        },
        {
          title: 'Slide 3 Title',
          body: 'Slide 3 body.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate, voluptas iusto accusamus quia impedit error odit dolores nulla officiis cum esse quidem repellat repudiandae sapiente expedita quibusdam exercitationem, placeat deleniti? Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum placeat praesentium dignissimos voluptatum facere possimus itaque voluptas mollitia quam omnis minima illo animi iste, rem laboriosam laudantium. Maxime, iure repudiandae!',
          media: '/static/img/modal-placeholder.jpg'
        }
      ]
    },
    {
      name: 'Wind Turbine Performance',
      heroImage: '/static/img/featured-projects/wind-turbine.jpg',
      statData: [
        {
          statName: 'Core Hours',
          statNumber: 10000,
          iconPath: '/static/icon/core-hours-icon.svg'
        },
        {
          statName: 'Jobs',
          statNumber: 55,
          iconPath: '/static/icon/jobs-icon.svg'
        },
        {
          statName: 'Petaflops',
          statNumber: 55,
          iconPath: '/static/icon/performance-icon.svg'
        }
      ],
      mainContent: [
        {
          title: 'Slide 1 Title',
          body: 'Slide 1 body.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate, voluptas iusto accusamus quia impedit error odit dolores nulla officiis cum esse quidem repellat repudiandae sapiente expedita quibusdam exercitationem, placeat deleniti? Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum placeat praesentium dignissimos voluptatum facere possimus itaque voluptas mollitia quam omnis minima illo animi iste, rem laboriosam laudantium. Maxime, iure repudiandae!',
          media: '/static/img/modal-placeholder.jpg'
        },
        {
          title: 'Slide 2 Title',
          body: 'Slide 2 body.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate, voluptas iusto accusamus quia impedit error odit dolores nulla officiis cum esse quidem repellat repudiandae sapiente expedita quibusdam exercitationem, placeat deleniti? Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum placeat praesentium dignissimos voluptatum facere possimus itaque voluptas mollitia quam omnis minima illo animi iste, rem laboriosam laudantium. Maxime, iure repudiandae!',
          media: 'https://www.w3schools.com/html/mov_bbb.mp4'
        },
        {
          title: 'Slide 3 Title',
          body: 'Slide 3 body.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate, voluptas iusto accusamus quia impedit error odit dolores nulla officiis cum esse quidem repellat repudiandae sapiente expedita quibusdam exercitationem, placeat deleniti? Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum placeat praesentium dignissimos voluptatum facere possimus itaque voluptas mollitia quam omnis minima illo animi iste, rem laboriosam laudantium. Maxime, iure repudiandae!',
          media: '/static/img/modal-placeholder.jpg'
        }
      ]
    },
    {
      name: 'Oceanic Atmospheric Forecasts',
      heroImage: '/static/img/featured-projects/oceanic-forecasts.jpg',
      statData: [
        {
          statName: 'Core Hours',
          statNumber: 10000,
          iconPath: '/static/icon/core-hours-icon.svg'
        },
        {
          statName: 'Jobs',
          statNumber: 55,
          iconPath: '/static/icon/jobs-icon.svg'
        },
        {
          statName: 'Petaflops',
          statNumber: 55,
          iconPath: '/static/icon/performance-icon.svg'
        }
      ],
      mainContent: [
        {
          title: 'Slide 1 Title',
          body: 'Slide 1 body.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate, voluptas iusto accusamus quia impedit error odit dolores nulla officiis cum esse quidem repellat repudiandae sapiente expedita quibusdam exercitationem, placeat deleniti? Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum placeat praesentium dignissimos voluptatum facere possimus itaque voluptas mollitia quam omnis minima illo animi iste, rem laboriosam laudantium. Maxime, iure repudiandae!',
          media: '/static/img/modal-placeholder.jpg'
        },
        {
          title: 'Slide 2 Title',
          body: 'Slide 2 body.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate, voluptas iusto accusamus quia impedit error odit dolores nulla officiis cum esse quidem repellat repudiandae sapiente expedita quibusdam exercitationem, placeat deleniti? Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum placeat praesentium dignissimos voluptatum facere possimus itaque voluptas mollitia quam omnis minima illo animi iste, rem laboriosam laudantium. Maxime, iure repudiandae!',
          media: 'https://www.w3schools.com/html/mov_bbb.mp4'
        },
        {
          title: 'Slide 3 Title',
          body: 'Slide 3 body.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate, voluptas iusto accusamus quia impedit error odit dolores nulla officiis cum esse quidem repellat repudiandae sapiente expedita quibusdam exercitationem, placeat deleniti? Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum placeat praesentium dignissimos voluptatum facere possimus itaque voluptas mollitia quam omnis minima illo animi iste, rem laboriosam laudantium. Maxime, iure repudiandae!',
          media: '/static/img/modal-placeholder.jpg'
        }
      ]
    }
  ]
};

export default {
  state
};
