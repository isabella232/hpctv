const state = {
  activeTab: 'user allocation',
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
      }
    },

    {
      group: 'NCAR Scientists',
      data: {
        coreHours: 29
      }
    },
    {
      group: 'University Community',
      data: {
        coreHours: 29
      }
    },
    {
      group: 'Wyoming-NCAR Alliance',
      data: {
        coreHours: 13
      }
    },
    {
      group: 'Accelerated Scientific Discovery',
      data: {
        coreHours: 0
      }
    }
  ]
};

export default { state };
