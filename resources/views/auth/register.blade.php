<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daftar - Gerak & Gaya</title>
    
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <style>
        /* Menggunakan style yang sama agar konsisten */
        :root { --primary: #f95c50; --primary-dark: #e44a3f; --bg-light: #fffcfb; --text: #333; }
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
        
        body { background-color: var(--bg-light); min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; }

        .auth-container {
            background: #fff; width: 900px; max-width: 100%; display: flex;
            border-radius: 20px; box-shadow: 0 20px 50px rgba(0,0,0,0.1); overflow: hidden;
            height: 600px; 
        }

        .auth-left {
            flex: 1; background: linear-gradient(135deg, var(--primary), #ff9b91);
            display: flex; flex-direction: column; justify-content: center; align-items: center;
            padding: 40px; color: white; text-align: center; position: relative; overflow: hidden;
        }

        .auth-left h2 { font-size: 32px; margin-bottom: 10px; font-weight: 700; z-index: 2; }
        .auth-left p { font-size: 14px; opacity: 0.9; line-height: 1.6; max-width: 80%; z-index: 2; }

        .floating-icon { position: absolute; font-size: 80px; opacity: 0.15; animation: float 6s infinite ease-in-out; }
        .icon-1 { top: 15%; left: 15%; }
        .icon-2 { bottom: 20%; right: 10%; animation-delay: 2s; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }

        .auth-right { flex: 1.2; padding: 40px 50px; display: flex; flex-direction: column; justify-content: center; overflow-y: auto; }

        .auth-header { margin-bottom: 25px; text-align: center; }
        .auth-header h3 { font-size: 24px; color: var(--text); font-weight: 700; }
        .auth-header p { color: #888; font-size: 13px; margin-top: 5px; }

        .form-group { margin-bottom: 15px; }
        .form-group label { display: block; font-size: 13px; font-weight: 600; color: #555; margin-bottom: 6px; }
        
        .form-control {
            width: 100%; padding: 12px 15px; border: 2px solid #eee; border-radius: 12px;
            font-size: 14px; transition: 0.3s; outline: none; background: #fafafa;
            padding-right: 45px; /* Ruang untuk ikon mata */
        }
        .form-control:focus { border-color: var(--primary); background: #fff; box-shadow: 0 0 0 4px rgba(249, 92, 80, 0.1); }

        .row { display: flex; gap: 15px; }
        .col { flex: 1; }

        .btn-primary {
            width: 100%; padding: 14px; background: var(--primary); color: white; border: none;
            border-radius: 12px; font-size: 16px; font-weight: 600; cursor: pointer; transition: 0.3s; margin-top: 10px;
        }
        .btn-primary:hover { background: var(--primary-dark); transform: translateY(-2px); }

        .footer-link { text-align: center; margin-top: 20px; font-size: 13px; color: #666; }
        .footer-link a { color: var(--primary); text-decoration: none; font-weight: 700; }

        /* === STYLE ICON MATA === */
        .input-group {
            position: relative;
            width: 100%;
        }
        
        .toggle-password {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            color: #aaa;
            font-size: 16px;
            transition: 0.3s;
            z-index: 10;
        }
        
        .toggle-password:hover {
            color: var(--primary);
        }

        @media (max-width: 768px) {
            .auth-container { flex-direction: column; height: auto; }
            .auth-left { display: none; }
            .auth-right { padding: 40px 30px; }
        }
    </style>
</head>
<body>

    <div class="auth-container">
        <div class="auth-left">
            <div class="floating-icon icon-1">📝</div>
            <div class="floating-icon icon-2">🎓</div>
            
            <h2>Bergabunglah!</h2>
            <p>Buat akun barumu dan mulai jelajahi materi interaktif Gerak & Gaya. Belajar jadi lebih mudah dan menyenangkan.</p>
        </div>

        <div class="auth-right">
            <div class="auth-header">
                <h3>Buat Akun Baru</h3>
                <p>Isi data diri Kamu dengan benar.</p>
            </div>

            @if ($errors->any())
                <div style="background-color: #ffe6e6; color: #d63031; padding: 15px; border-radius: 10px; margin-bottom: 20px; font-size: 13px; border: 1px solid #fab1a0;">
                    <ul style="margin-left: 20px;">
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <form action="{{ route('register') }}" method="POST">
                @csrf
                
                <div class="form-group">
                    <label>Nama Lengkap</label>
                    <input type="text" name="nama_lengkap" class="form-control" placeholder="Contoh: Budi Santoso" value="{{ old('nama_lengkap') }}" required>
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input type="email" name="email" class="form-control" placeholder="nama@email.com" value="{{ old('email') }}" required>
                </div>

                <div class="row">
                    <div class="col form-group">
                        <label>Kata Sandi</label>
                        <div class="input-group">
                            <input type="password" name="password" id="password" class="form-control" placeholder="••••••••" required>
                            <i class="fa-regular fa-eye toggle-password" id="icon-pass" onclick="toggleVisibility('password', 'icon-pass')"></i>
                        </div>
                    </div>
                    
                    <div class="col form-group">
                        <label>Konfirmasi Sandi</label>
                        <div class="input-group">
                            <input type="password" name="password_confirmation" id="password_confirmation" class="form-control" placeholder="••••••••" required>
                            <i class="fa-regular fa-eye toggle-password" id="icon-confirm" onclick="toggleVisibility('password_confirmation', 'icon-confirm')"></i>
                        </div>
                    </div>
                </div>

                <input type="hidden" name="peran" value="siswa">

                <button type="submit" class="btn-primary">Daftar Sekarang</button>
            </form>

            <div class="footer-link">
                Sudah punya akun? <a href="{{ route('login') }}">Masuk di sini</a>
            </div>
        </div>
    </div>

    <script>
        function toggleVisibility(inputId, iconId) {
            var input = document.getElementById(inputId);
            var icon = document.getElementById(iconId);
            
            if (input.type === "password") {
                input.type = "text";
                // Ubah ikon jadi mata dicoret (slash)
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = "password";
                // Kembalikan ikon jadi mata biasa
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        }
    </script>

</body>
</html>