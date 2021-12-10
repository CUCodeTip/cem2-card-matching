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
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'bubble',
        },
      },
      modes: {
        bubble: {
          distance: 400,
          duration: 0.3,
          opacity: 1,
          size: 4,
        },
      },
    },
    particles: {
      links: {
        color: {
          value: '#ffffff',
        },
        distance: 500,
        opacity: 0.4,
        width: 2,
      },
      move: {
        attract: {
          rotate: {
            x: 600,
            y: 1200,
          },
        },
        direction: 'bottom',
        enable: true,
        outModes: {
          bottom: 'out',
          left: 'out',
          right: 'out',
          top: 'out',
        },
      },
      number: {
        density: {
          enable: true,
        },
        value: getParticleNumber(),
      },
      opacity: {
        random: {
          enable: true,
        },
        value: {
          min: 0.1,
          max: 0.5,
        },
        animation: {
          speed: 1,
          minimumValue: 0.1,
        },
      },
      size: {
        random: {
          enable: true,
        },
        value: {
          min: 1,
          max: 10,
        },
        animation: {
          speed: 40,
          minimumValue: 0.1,
        },
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
