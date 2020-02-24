const state = {
  activeTab: 'facility allocation',
  renderAllSprites: true,
  aoigList: [
    {
      prettyName: 'Atmospheric Chemistry'
    },
    {
      prettyName: 'Fluid Dynamics and Turbulence'
    },
    {
      prettyName: 'Geospace Sciences'
    },
    {
      prettyName: 'Ocean Sciences'
    },
    {
      prettyName: 'Social and Economic Impacts'
    },
    {
      prettyName: 'Weather Prediction'
    },
    {
      prettyName: 'Environmental Biology'
    },
    {
      prettyName: 'Computational Science'
    },
    {
      prettyName: 'Social and Economic Impacts'
    },
    {
      prettyName: 'Weather Prediction'
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
