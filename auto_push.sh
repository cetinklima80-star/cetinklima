#!/bin/bash

# 1. Tüm değişiklikleri listeye ekle
echo "⏳ Değişiklikler sahneye ekleniyor (git add .)..."
git add .

# 2. Kullanıcıdan commit mesajı iste, boş bırakılırsa varsayılan mesajı yaz
echo "✍️  Commit mesajınızı girin ve [ENTER]'a basın (Boş bırakırsanız 'Otomatik Güncelleme' yazılır):"
read commit_msg

if [ -z "$commit_msg" ]; then
    commit_msg="Otomatik Güncelleme"
fi

# 3. Commit işlemini gerçekleştir
git commit -m "$commit_msg"

# 4. GitHub'a pushla
echo "🚀 Kodlar GitHub'a fırlatılıyor (git push origin main)..."
git push origin main

echo "✅ İşlem başarıyla tamamlandı! GitHub Pages güncelleniyor..."