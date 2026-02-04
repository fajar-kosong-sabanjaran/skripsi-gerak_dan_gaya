<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Masuk - Gerak & Gaya</title>
    
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <style>
        /* RESET & VARIABEL */
        :root {
            --primary: #f95c50;
            --primary-dark: #e44a3f;
            --bg-light: #fffcfb;
            --text: #333;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
        
        body {
            background-color: var(--bg-light);
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* CONTAINER UTAMA */
        .auth-container {
            background: #fff;
            width: 900px;
            max-width: 90%;
            height: 550px;
            display: flex;
            border-radius: 20px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.1);
            overflow: hidden;
            position: relative;
        }

        /* BAGIAN KIRI (VISUAL) */
        .auth-left {
            flex: 1.2; /* Sedikit lebih lebar */
            background: linear-gradient(135deg, #ff9b91, var(--primary));
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 40px;
            color: white;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .auth-left h2 { font-size: 36px; margin-bottom: 10px; font-weight: 700; z-index: 2; }
        .auth-left p { font-size: 14px; opacity: 0.9; line-height: 1.6; max-width: 80%; z-index: 2; }

        /* Animasi Ikon Background */
        .floating-icon {
            position: absolute;
            font-size: 80px;
            opacity: 0.15;
            animation: float 6s infinite ease-in-out;
        }
        .icon-1 { top: 10%; left: 10%; animation-delay: 0s; }
        .icon-2 { bottom: 15%; right: 10%; animation-delay: 2s; font-size: 100px; }
        .icon-3 { top: 40%; right: 20%; animation-delay: 4s; font-size: 60px; }

        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
        }

        /* BAGIAN KANAN (FORM) */
        .auth-right {
            flex: 1;
            padding: 50px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .auth-header { margin-bottom: 30px; }
        .auth-header h3 { font-size: 24px; color: var(--text); font-weight: 700; margin-bottom: 5px; }
        .auth-header p { color: #888; font-size: 13px; }

        /* FORM STYLES */
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; font-size: 13px; font-weight: 600; color: #555; margin-bottom: 8px; }
        
        .form-control {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #eee;
            border-radius: 12px;
            font-size: 14px;
            transition: 0.3s;
            outline: none;
            background: #fafafa;
            /* Padding kanan untuk icon mata */
            padding-right: 45px; 
        }

        .form-control:focus {
            border-color: var(--primary);
            background: #fff;
            box-shadow: 0 0 0 4px rgba(249, 92, 80, 0.1);
        }

        .btn-primary {
            width: 100%;
            padding: 14px;
            background: var(--primary);
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: 0.3s;
            margin-top: 10px;
            box-shadow: 0 10px 20px rgba(249, 92, 80, 0.2);
        }

        .btn-primary:hover {
            background: var(--primary-dark);
            transform: translateY(-2px);
            box-shadow: 0 15px 30px rgba(249, 92, 80, 0.3);
        }

        .footer-link {
            text-align: center;
            margin-top: 25px;
            font-size: 13px;
            color: #666;
        }
        .footer-link a { color: var(--primary); text-decoration: none; font-weight: 700; }
        .footer-link a:hover { text-decoration: underline; }

        /* === STYLE ICON MATA (Sama seperti Register) === */
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

        /* Responsif untuk HP */
        @media (max-width: 768px) {
            .auth-container { flex-direction: column; height: auto; width: 95%; margin: 20px; }
            .auth-left { display: none; /* Sembunyikan gambar di HP */ }
            .auth-right { padding: 40px 30px; }
        }
    </style>
</head>
<body>

    <div class="auth-container">
        <div class="auth-left">
            <div class="floating-icon icon-1">🍎</div>
            <div class="floating-icon icon-2">🚀</div>
            <div class="floating-icon icon-3">⚛️</div>
            
            <h2>Selamat Datang!</h2>
            <p>Siap melanjutkan petualangan? Masuk sekarang untuk mengakses materi <b>gerak dan gaya.</b></p>
        </div>

        <div class="auth-right">
            <div class="auth-header">
                <h3>Masuk Akun</h3>
                <p>Silakan masukkan email dan kata sandi Kamu.</p>
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

            <form action="{{ route('login') }}" method="POST">
                @csrf
                
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" name="email" class="form-control" placeholder="nama@email.com" value="{{ old('email') }}" required>
                </div>

                <div class="form-group">
                    <label>Kata Sandi</label>
                    <div class="input-group">
                        <input type="password" name="password" id="password" class="form-control" placeholder="••••••••" required>
                        <i class="fa-regular fa-eye toggle-password" id="icon-pass" onclick="toggleVisibility('password', 'icon-pass')"></i>
                    </div>
                </div>

                <button type="submit" class="btn-primary">Masuk Sekarang</button>
            </form>

            <div class="footer-link">
                Belum punya akun? <a href="{{ route('register') }}">Daftar di sini</a>
            </div>
        </div>
    </div>

    <script>
        function toggleVisibility(inputId, iconId) {
            var input = document.getElementById(inputId);
            var icon = document.getElementById(iconId);
            
            if (input.type === "password") {
                input.type = "text";
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = "password";
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        }
    </script>

</body>
</html>