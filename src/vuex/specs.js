const state = {
  pointsOfInterest: [
    {
      x: 9,
      y: 35,
      modalData: {
        title: 'Heat Output',
        subtitle: 'TBD',
        body: 'We recycle Cheyenne’s waste heat to warm our offices and melt snow along the building’s sidewalks during winter.',
        media: '/static/img/modal-placeholder.jpg'
      }
    },
    {
      x: 22,
      y: 68,
      modalData: {
        title: 'Data Transfer Rate',
        subtitle: '200 GBps (Gigabytes per second)',
        body: 'Cheyenne writes data 20,000x faster than a typical USB flash drive can handle and about 3x faster than the previous supercomputer, Yellowstone.',
        media: '/static/img/modal-placeholder.jpg'
      }
    },
    {
      x: 55,
      y: 16,
      modalData: {
        title: 'Processing Cores',
        subtitle: ' 145,152 total processing cores',
        body: 'Each core processes an individual dataset while simultaneously communicating  with other cores to make more complex calculations.',
        media: '/static/img/modal-placeholder.jpg'
      }
    },
    {
      x: 81,
      y: 16,
      modalData: {
        title: 'Total Memory',
        subtitle: '313 TB',
        body: 'That’s a LOT of SDRAM. For comparison, you’d need about 78,250 HP Chromebooks for the same amount of total memory.',
        media: '/static/img/modal-placeholder.jpg'
      }
    },
    {
      x: 50,
      y: 59,
      modalData: {
        title: 'Performance',
        subtitle: '5.4 Petaflops',
        body: 'Cheyenne’s computing speed is so fast, you would need 21,600 iPhone 7’s just to keep up.',
        media: '/static/img/modal-placeholder.jpg'
      }
    }
  ],
  legend: [
    {
      title: 'Supercomputer',
      subtitle: '',
      definition: 'A computer built to handle intense computational demands and enormous datasets.'
    },
    {
      title: 'Project',
      subtitle: '',
      definition: 'An individual scientific study Cheyenne works on. Each project may have many “jobs.”'
    },
    {
      title: 'Job',
      subtitle: '',
      definition: 'A discrete amount of scientific work that runs on Cheyenne when space is available. Scientists may break complicated computational experiments into many jobs, often to reach a stopping point within a time limit. '
    },
    {
      title: 'Core Hours',
      subtitle: '',
      definition: 'The number of cores used in a computational task multiplied by the duration of the task in hours. Core hours measure the “shares” of computer time consumed by different projects and jobs. Cheyenne delivers over 1.2 billion core hours to scientific projects each year. '
    },
    {
      title: 'Node',
      subtitle: '',
      definition: 'Each node could be considered its own computer. Cheyenne uses a combination of 4,032 nodes to generate its incredible computing power. Computing jobs may run on one or more nodes.'
    },
    {
      title: 'Processor',
      subtitle: '',
      definition: "The silicon “chip” that performs a computer's calculations or operations. Each of Cheyenne’s 4,032 nodes has two Intel “Broadwell” processors, and each processor has 18 cores."
    },
    {
      title: 'Core',
      subtitle: '',
      definition: 'A small, single processing unit that receives instructions and performs calculations. Each core handles a piece of a larger, more complex scientific simulation. Cheyenne has over 145,000 total cores, with 18 cores on each processor.'
    },
    {
      title: 'Flops',
      subtitle: '',
      definition: 'A unit of performance that measures the rate at which a computer makes floating-point (decimal) calculations. Floating-point calculations are critical to scientific simulations because they’re a more precise measurement than the standard (integer) instructions per second. Cheyenne’s performance is measured in PetaFLOPS, or one quadrillion FLOPS'
    }
  ]
};

export default {
  state
};
