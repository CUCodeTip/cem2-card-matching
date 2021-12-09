import { writable } from 'svelte/store'

const getParticleNumber = () => {
  const width = window.innerWidth
  if (width < 500) {
    return 40
  } else if (width < 1000) {
    return 70
  } else if (width < 1500) {
    return 100
  } else if (width < 2000) {
    return 150
  } else {
    return 200
  }
}

const createParticlesConfig = () => {
  const { subscribe, update } = writable({
    fullScreen: {
      zIndex: -10,
    },
    fpsLimit: 30,
    // interactivity: {
    //   events: {
    //     onHover: {
    //       enable: true,
    //       mode: 'grab',
    //     },
    //   },
    //   modes: {
    //     grab: {
    //       distance: 150,
    //     },
    //   },
    // },
    particles: {
      links: {
        blink: true,
        distance: 150,
        enable: true,
        opacity: 0.5,
      },
      move: {
        enable: true,
        speed: 0.1,
        outModes: 'out',
      },
      size: {
        value: 0,
      },
      number: {
        value: getParticleNumber(),
      },
    },
  })

  window.onresize = () =>
    update((config) => {
      config.particles.number.value = getParticleNumber()
      return config
    })

  return { subscribe }
}

/**
 * particlesConfig that readjusts the number of particles on window resize
 */
const config = createParticlesConfig()
export default config
