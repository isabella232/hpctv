const state = {
  colorScheme: 'cool',
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
    }
    // TODO: This is not a valid aoig 
    // {
    //   prettyName: 'Climate Sciences',
    //   queryString: 'Climate%20Sciences'
    // }
  ]
};

export default { state };
