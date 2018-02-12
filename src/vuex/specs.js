const state = {
  pointsOfInterest: [
    {
      x: 9,
      y: 35,
      modalData: {
        title: 'Heat Output',
        subtitle: 'TBD',
        body: 'We recycle Cheyenne’s heat waste to heat our offices and melt snow along the building’s sidewalks during winter. ',
        media: '/static/img/modal-placeholder.jpg'
      }
    },
    {
      x: 22,
      y: 68,
      modalData: {
        title: 'Data Transfer Rate',
        subtitle: '200 GBps (Gigabytes per second)',
        body: 'Cheyenne transfers data 70,515x faster than the US’s average internet speed and about 3x faster than the previous supercomputer, Yellowstone.',
        media: '/static/img/modal-placeholder.jpg'
      }
    },
    {
      x: 55,
      y: 16,
      modalData: {
        title: 'Processing Cores',
        subtitle: ' 145,152 total processing cores',
        body: 'Each core processes individual datasets while simultaneously collaborating with other cores to process more complex data.',
        media: '/static/img/modal-placeholder.jpg'
      }
    },
    {
      x: 81,
      y: 16,
      modalData: {
        title: 'Total Memory',
        subtitle: '313 TB',
        body: 'That’s a LOT of SDRAM. For comparison, you’d need about 104,000 iPhone 7’s for the same amount of total memory',
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
  glossary: [
    {
      title: 'Supercomputer',
      subtitle: '',
      definition: ' a computer built to perform at a very high operational rate and handle intense computational demands and enormous datasets.'
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
      definition: 'the number of cores used in a computational task multiplied by the duration of the task in hours. Core hours allocate ‘shares’ of computer time to different projects and jobs. Cheyenne allocates over 1.2 billion core hours each year. '
    },
    {
      title: 'Node',
      subtitle: '',
      definition: 'each node could be considered its own computer. Cheyenne uses a combination of 4,032 nodes to generate its incredible computing power.'
    },
    {
      title: 'Processor',
      subtitle: '',
      definition: "performs a computer's calculations or operations. Cheyenne breaks large, complex problems into pieces, each of which are handled by a separate processor. Cheyenne’s 8,064 Intel ‘Broadwell’ processors each hold 18 cores."
    },
    {
      title: 'Core',
      subtitle: '',
      definition: 'a small, single processing unit capable of running its own processes that receives instructions and performs calculations. One Cheyenne processor consists of 18 cores and has over 145k total cores.'
    },
    {
      title: 'Flops',
      subtitle: '',
      definition: '(Floating Point Operations per Second): a unit of computer performance that requires floating point calculations. Supercomputing performance is measured in PetaFLOPS, or one thousand million million FLOPS.'
    }
  ]
};

export default {
  state
};
