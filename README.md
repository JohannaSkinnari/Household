<p align="center">
  <img src="assets/images/Logo.png" />
</p>

## Presented by team Skrik & Panik

Our team have made a mobile-application with the purpose to make it easier to get along and be reminded of various chores that needs to be taken care of in the household. <br> Our targeted audience is `families`, `partners` and/or `relatives` <br> The application is built with simplicity in mind so that everyone can quickly get a grasp and start completing chores, even _grand'ma_ !

### Installation

- Clone the project to to your computer from git using `git clone`
- Run `npm install` in the terminal to update with necessary dependencies
- Run `npm start` to startup the project
- Install `Expo Go` from your `App-store`
- Either scan the `QR-code` or start the project named `Hushållet`

### Usage

You can login with<br> email: Jonna@gmail.com <br> password: 123456 <br> or create your own account

### ProductOwner

<details>
    <summary>Click to see Details of Product Owner</summary>
    <p align="center">
  <img src="https://media.discordapp.net/attachments/776094515315998722/905825265660362832/unknown.png" />
</p>
</details>

---

### Requirements Specifications

Amount of requirements : **40.** <br>
**G**: 20 (50%). <br>
**VG**: 32 (80%).<br>

our total is _33_ requirements and 2 additionals that are up to productowner to decide on.

<details>
    <summary>G requirements</summary>
    <b>Overall-krav</b> <br>
    1. &#9745; En logga, splashscreen och appikon ska designas och användas. * <br>
    2. &#9745; Applikationen ska byggas med RN, Expo & TS. * <br>
    3. &#9745; Designen av appen ska utgå ifrån befintliga skisser * <br>
    <b>Hushåll</b> <br>
    4. &#9745; Ett hushåll ska ha ett namn och en genererad (enkel) kod ,namnet ska gå att ändra. * <br>
    <b>Konto</b> <br>
    5. &#9745; En användare ska kunna logga in sig. * <br>
    6. &#9745; En användare ska kunna skapa ett nytt hushåll. * <br>
    7. &#9745; En användare ska kunna gå med i ett hushåll genom att ange hushållets kod. * <br>
    <b>Profil</b> <br>
    8. &#9745; En användare ska kunna ange sitt namn. * <br>
    9. &#9745; En användare ska kunna välja en avatar (emoji-djur + färg) från en fördefinierad lista. * <br>
    10. &#9745; Valda avatarer ska inte kunna väljas av andra användare i hushållet. * <br>
    11. &#9745; Avataren ska användas i appen för att visa vad användaren har gjort. * <br>
    <b>Sysslor</b> <br>
    12. &#9745; En ägare ska kunna lägga till sysslor att göra i hemmet. *<br>
    13. &#9745; En syssla ska ha ett namn, en beskrivning, hur ofta den görs (dagar), och en vikt*<br>
    14. &#9745; En ägare ska kunna redigera en syssla. *<br>
    15. &#9745; En ägare ska kunna ta bort en syssla. *<br>
    <b>Dagsvyn</b> <br>
    16. &#9745; Alla sysslor ska listas i en dagsvy och ge en översikt kring vad som behöver göras. * <br>
    17. &#9745; Vem/vilka som har gjort sysslan visas, hur många dagar sedan sysslan gjordes /försenad.*<br>
    18. &#9745; beskrivningen av sysslan visas och det ska även kunna markeras med ett tryck *<br>
    <b>Statistik</b> <br>
    19. &#9745; En användare ska kunna se fördelningen mellan användarna i sitt hushåll. *<br>
    20. &#9745; Varje statistikvy ska visa den totala fördelningen samt fördelning av varje enskild syssla*<br>
    21. &#9745; Det ska finnas en statistikvy över ”nuvarande vecka”. * <br>
</details>
<details>
    <summary>VG requirements</summary>
    <b>Overall</b> <br>
    1. &#9745; All information ska kommuniceras till och från en server. <br>
    <b>Hushåll</b> <br>
    2. &#9745; Alla användare i ett hushåll ska kunna se vilka som tillhör ett hushåll<br>
    3. &#9745; En ägare av ett hushåll ska kunna se förfrågningar om att gå med i hushållet.<br>
    4. &#9745; En ägare ska kunna acceptera eller neka förfrågningar. <br>
    5. &#9745; En ägare ska kunna göra andra till ägare<br>
    6. &#9745; En ägare ska kunna pausa en användare och då tas det inte med i statistiken<br>
    <b>Profil</b> <br>
    7. &#9745; Om en användare tillhör två eller fler hushåll ska denne kunna välja att byta <br>
    <b>Sysslor</b> <br>
    8. &#9745; När en syssla tas bort ska användaren få en varning om att all statistik tas bort <br>
    <b>Konto</b> <br>
    9. &#9745; en ägare av hushållet först godkänna en ny användare. <br>
    10. &#9745; En användare ska kunna lämna ett hushåll<br>
    <b> Statestik </b> <br>
    11. &#9745; Det ska finnas en statistikvy över ”förra vecka”.<br>
    12. &#9745; Det ska finnas en statistikvy över ”förra månaden”. <br>
</details>
<details>
    <summary>Extra features</summary>
    <b>Upp till produktägare att avgöra</b> <br>
    1. &#9745; Onboarding slide efter ny användare registreras<br>
    2. &#9745; Statistik vy för denna månaden<br>
</details>
<details>
<summary>Deviations</summary>
  <b>Only built for Android</b>
<p align="center">
  <img src="https://media.discordapp.net/attachments/776094515315998722/905843055578447882/unknown.png" />
</p>
<p align="center">
  <img src="https://media.discordapp.net/attachments/776094515315998722/905843372562989206/unknown.png" />
</p>
We dicided to move the edit button from the daily chore view to a modal instead. Shown in the pictures. <br>
<br>
<br>
<p align="center">
  <img src="https://cdn.discordapp.com/attachments/776094515315998722/906575507758395412/unknown.png" />
</p>
<p align="center">
  <img src="https://media.discordapp.net/attachments/776094515315998722/906575782258810960/unknown.png" />
</p>
Instead of having the images inside the piechart, we decided to relocate them below the main chart.
</details>
