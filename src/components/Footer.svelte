<script>
    import linkedinIcon from "../assets/icon-linkedin.svg?url";
    import mailIcon from "../assets/icon-mail.png?url";
</script>

<footer class="w-full flex flex-row items-center justify-center fixed bottom-0 bg-black bg-opacity-30 ">
  <div class="w-[80vw] h-[10vh] my-4 flex flex-col align-middle items-center justify-between sm:flex-row">  
  <p class="text-white font-bold">
        Emmanuel Guzmán ©
    </p>
    <div class="flex flex-row w-[10vh] gap-6">
      <a class="rounded-lg" href={process.env.MAIL}>
        <img src={mailIcon} alt="Mail Icon">
      </a>
      <a class="rounded-lg " href="https://{process.env.LINKEDIN}" target="_blank">
        <img src={linkedinIcon} alt="Linkedin Icon">
      </a>
    </div>
  </div>
</footer>