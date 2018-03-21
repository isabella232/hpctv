const state = {
  activeTab: 'facility allocation',
  aoigList: [
    {
      prettyName: 'Atmospheric Chemistry',
      queryString: 'Atmospheric%20Chemistry'
    },
    {
      prettyName: 'Fluid Dynamics and Turbulence',
      queryString: 'Fluid%20Dynamics%20and%20Turbulence'
    },
    {
      prettyName: 'Geospace Sciences',
      queryString: 'Geospace%20Sciences'
    },
    {
      prettyName: 'Ocean Sciences',
      queryString: 'Ocean%20Sciences'
    },
    {
      prettyName: 'Social and Economic Impacts',
      queryString: 'Social%20and%20Economic%20Impacts'
    },
    {
      prettyName: 'Weather Prediction',
      queryString: 'Weather%20Prediction'
    },
    {
      prettyName: 'Environmental Biology',
      queryString: 'Environmental%20Biology'
    },

    {
      prettyName: 'Computational Science',
      queryString: 'Computational%20Science'
    },
    {
      prettyName: 'Social and Economic Impacts',
      queryString: 'Social%20and%20Economic%20Impacts'
    },
    {
      prettyName: 'Weather Prediction',
      queryString: 'Weather%20Prediction'
    }
  ],

  userAllocation: [
    {
      group: 'Climate Simulation Laboratory',
      data: {
        coreHours: 27
      },
      body: 'For researchers seeking high-performance computing and data storage systems to support demanding climate simulations that require tens of millions of core hours.'
    },

    {
      group: 'NCAR Scientists',
      data: {
        coreHours: 29
      },
      body: 'They use Cheyenne and other Computational Information Systems Laboratory (CISL) resources to study climate, weather, and solar interactions with Earth’s atmosphere.'
    },
    {
      group: 'University Community',
      data: {
        coreHours: 29
      },
      body: 'Can access Cheyenne and CISL’s other computational analysis and visualization resources and storage systems for projects beyond the scope of university computing centers.'
    },
    {
      group: 'Wyoming-NCAR Alliance',
      data: {
        coreHours: 13
      },
      body: 'Through this collaboration, Cheyenne reserves about 160 million core hours per year for University of Wyoming-led projects.'
    },
    {
      group: 'Accelerated Scientific Discovery',
      data: {
        coreHours: 0
      },
      body: 'For researchers who require dedicated, large-scale resources for projects that study challenging and important problems in the atmospheric or computational sciences.'
    }
  ]
};

export default { state };
