<!-- @format -->

<template lang="pug">
main
  CanvasGame
  .content
    img.nyll( src="~/assets/img/Nyll.svg" )
    h1 Canvas Experiments

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

    img.nyll
      height: 10em
      user-drag: none
      -webkit-user-drag: none
    gap: 2em
    h1
      color: white
      font-weight: 800
      font-size: 2.5em

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