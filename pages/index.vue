<!-- @format -->

<template lang="pug">
main
  CanvasGame
  .content
    img.nyll( src="~/assets/img/Nyll.svg" )
    h1 Canvas Experiments
    NuxtLink(to="/diep") Diep.io Clone

</template>


<style lang="sass">

main
  height: 100vh
  .content
    user-select: none
    position: relative
    height: 100%
    display: flex
    justify-content: center
    flex-direction: column
    padding-left: 33.3%
    transform: translateX(-20%)
    width: fit-content
    color: white
    text-align: center

    img.nyll
      height: 10em
      user-drag: none
      -webkit-user-drag: none
    gap: 2em
    h1
      font-weight: 800
      font-size: 2.5em
    a
      font-size: 2em
      background: #fff3
      width: fit-content
      margin: 0 auto
      padding: .2em 1em
      border-radius: 1em
      backdrop-filter: blur(.2em)
      border: 1px solid #fff3


    @media (orientation: portrait)
      padding: 0
      width: 100%
      transform: none
      align-items: center
      img.nyll
        height: 5em
      gap: 1em
      h1
        font-size: 1.25em
    
</style>