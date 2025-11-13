echo 5 > "/home/dsfamilyroyal/.local/share/cros-motd"
# Installation d'Anbox (peut ne pas fonctionner parfaitement)
sudo apt update
sudo apt install anbox
# Installer Android SDK et émulateur
sudo apt install android-sdk
# Installer les outils PWA
npm install -g create-pwa
# Créer une application Python avec interface
sudo apt install python3-tk  # Pour Tkinter
pip3 install pyqt5  # Pour PyQt
# Installer les outils PWA
npm install -g create-pwa
npm install -g @vue/cli  # Pour Vue.js
npm install -g create-react-app  # Pour React
# React
npx create-react-app mon-app
cd mon-app
npm start
# Vue.js
npm install -g @vue/cli
vue create mon-projet-vue
cd mon-projet-vue
npm run serve
# Créer un dossier de projet
mkdir ~/mon-premier-site
cd ~/mon-premier-site
# Créer les fichiers de base
touch index.html style.css script.js
# Démarrer un serveur local
python3 -m http.server 8000
# Installer ZSH et Oh My Zsh
sudo apt install zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
# Thèmes et plugins utiles
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
# Outils de build
sudo apt install build-essential
# Visual Studio Code (recommandé)
sudo apt install code
# Atom
sudo apt install atom
# Sublime Text (via Snap)
sudo snap install sublime-text --classic
# Installer les outils PWA
npm install -g create-pwa
npm install -g @vue/cli  # Pour Vue.js
npm install -g create-react-app  # Pour React
# Mettre à jour le système
sudo apt update && sudo apt upgrade
# Installer Git pour le contrôle de version
sudo apt install git
# Installer un éditeur de code (VS Code)
sudo apt install code
# OU
sudo apt install vim nano gedit
# Installer Node.js et npm
sudo apt install nodejs npm
# Vérifier l'installation
node --version
npm --version
# Installer Python
sudo apt install python3 python3-pip
# Installer PHP (si besoin)
sudo apt install php
# Créer un dossier de projet
mkdir ~/mon-premier-site
cd ~/mon-premier-site
# Créer les fichiers de base
touch index.html style.css script.js
# Démarrer un serveur local
python3 -m http.server 8000
# OU avec Node.js
npx http-server
# Dans le terminal Linux, vous pouvez extraire le XAPK :
cd ~/Téléchargements
mv "Instagram_400.0.0.49.68_APKPure.xapk" "instagram.zip"
unzip instagram.zip
# Puis cherchez le fichier .apk dans le dossier extrait
sudo apt update
sudo apt install virtualbox
sudo apt update && sudo apt install virtualbox-qt
# Ajouter les dépôts non-free
sudo nano /etc/apt/sources.list
deb http://deb.debian.org/debian bookworm main non-free
deb http://deb.debian.org/debian bookworm-updates main non-free
deb http://security.debian.org/debian-security bookworm-security main non-free
# Installer les dépendances nécessaires
sudo apt install wget curl
# Télécharger la version pour Debian depuis le site d'Oracle
wget https://download.virtualbox.org/virtualbox/7.0.12/virtualbox-7.0_7.0.12-159484~Debian~bookworm_amd64.deb
# Installer le paquet
sudo dpkg -i virtualbox-7.0_7.0.12-159484~Debian~bookworm_amd64.deb
sudo apt install -f # Pour résoudre les dépendances manquantes
# Mettre à jour les paquets
sudo apt update
# Installer les outils de base pour compiler
sudo apt install build-essential
# Installer les en-têtes du noyau Linux (c'est crucial)
sudo apt install linux-headers-$(uname -r)
# Installer les autres dépendances
sudo apt install gcc make perl dkms
# Installer les outils spécifiques pour VirtualBox
sudo apt install virtualbox-dkms
sudo apt install qemu-kvm virt-manager libvirt-daemon-system
# Tenter la configuration de VirtualBox
sudo /sbin/vboxconfig
# Vérifier si les modules sont chargés
lsmod | grep vbox
# Vérifier le statut du service
sudo systemctl status vboxdrv
# Installer QEMU/KVM avec virt-manager
sudo apt install qemu-kvm qemu-utils virt-manager libvirt-daemon-system libvirt-clients bridge-utils
# Ajouter votre utilisateur au groupe libvirt
sudo usermod -a -G libvirt $USER
# Redémarrer le service libvirt
sudo systemctl enable libvirtd
sudo systemctl start libvirtd
# Vérifier que KVM est disponible
kvm-ok
# Essayer de lancer VirtualBox
virtualbox
# Dans le terminal Linux, téléchargez Windows (ou faites-le via le navigateur)
# Lien officiel : https://www.microsoft.com/fr-fr/software-download/windows10
# Ou pour Windows 11 : https://www.microsoft.com/fr-fr/software-download/windows11
# Dans le terminal Linux, téléchargez Windows (ou faites-le via le navigateur)
# Lien officiel : https://www.microsoft.com/fr-fr/software-download/windows10
# Ou pour Windows 11 : https://www.microsoft.com/fr-fr/software-download/windows11
