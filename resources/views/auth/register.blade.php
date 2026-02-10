<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daftar - Gerak & Gaya</title>
    
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <style>
        :root { 
            --primary: #f95c50; 
            --primary-dark: #e44a3f; 
            --bg-light: #fffcfb; 
            --text: #333; 
        }

        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
        
        body { 
            background-color: #fff; 
            height: 100vh; 
            width: 100vw;
            overflow: hidden; /* Mencegah scroll bar ganda */
        }

        .auth-container {
            width: 100%;
            height: 100%;
            display: flex;
            background: #fff;
            box-shadow: none;
            border-radius: 0;
        }

        /* --- BAGIAN KIRI (Gambar & Pesan) --- */
        .auth-left {
            width: 45%; 
            background: linear-gradient(135deg, var(--primary), #ff9b91);
            display: flex; 
            flex-direction: column; 
            justify-content: center; 
            align-items: center;
            padding: 60px; 
            color: white; 
            text-align: center; 
            position: relative; 
            overflow: hidden;
        }

        .auth-left h2 { font-size: 38px; margin-bottom: 15px; font-weight: 700; z-index: 2; }
        .auth-left p { font-size: 16px; opacity: 0.95; line-height: 1.6; max-width: 90%; z-index: 2; }

        .floating-icon { position: absolute; font-size: 120px; opacity: 0.15; animation: float 6s infinite ease-in-out; }
        .icon-1 { top: 10%; left: 10%; }
        .icon-2 { bottom: 15%; right: 10%; animation-delay: 2s; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }

        /* --- BAGIAN KANAN (Formulir) --- */
        .auth-right { 
            flex: 1; 
            padding: 40px 80px; 
            display: flex; 
            flex-direction: column; 
            justify-content: center; 
            overflow-y: auto; 
            background-color: #fff;
        }

        .auth-header { margin-bottom: 30px; }
        .auth-header h3 { font-size: 28px; color: var(--text); font-weight: 700; margin-bottom: 5px;}
        .auth-header p { color: #888; font-size: 14px; }

        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; font-size: 14px; font-weight: 600; color: #555; margin-bottom: 8px; }
        
        .form-control {
            width: 100%; padding: 14px 18px; border: 2px solid #f0f0f0; border-radius: 12px;
            font-size: 14px; transition: 0.3s; outline: none; background: #fafafa;
        }
        .form-control:focus { border-color: var(--primary); background: #fff; box-shadow: 0 0 0 4px rgba(249, 92, 80, 0.1); }

        /* Dropdown Style */
        select.form-control {
            appearance: none;
            background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
            background-repeat: no-repeat;
            background-position: right 15px center;
            background-size: 16px;
            cursor: pointer;
        }

        .row { display: flex; gap: 20px; }
        .col { flex: 1; }

        .btn-primary {
            width: 100%; padding: 16px; background: var(--primary); color: white; border: none;
            border-radius: 12px; font-size: 16px; font-weight: 600; cursor: pointer; transition: 0.3s; margin-top: 10px;
            box-shadow: 0 10px 20px rgba(249, 92, 80, 0.15);
        }
        .btn-primary:hover { background: var(--primary-dark); transform: translateY(-2px); box-shadow: 0 15px 25px rgba(249, 92, 80, 0.25); }

        /* --- LINK FOOTER (Masuk & Kembali) --- */
        .footer-link { text-align: center; margin-top: 25px; font-size: 14px; color: #666; }
        
        /* Link 'Masuk di sini' - Warna Primer */
        .footer-link a { 
            color: var(--primary); 
            text-decoration: none; 
            font-weight: 700; 
            transition: 0.2s;
        }
        .footer-link a:hover { text-decoration: underline; color: var(--primary-dark); }

        /* Link 'Kembali ke beranda' - Warna Abu-abu ke Primer */
        .back-home {
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
        }
        .back-home a {
            color: #888; /* Warna awal abu-abu agar tidak terlalu mencolok */
            text-decoration: none;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            gap: 8px; /* Jarak ikon dan teks */
            transition: all 0.3s ease;
        }
        .back-home a:hover {
            color: var(--primary); /* Berubah jadi warna tema saat hover */
            transform: translateX(-5px); /* Efek geser ke kiri */
        }

        /* Input Password Group */
        .input-group { position: relative; width: 100%; }
        .form-control.password-input { padding-right: 45px; }
        
        .toggle-password {
            position: absolute; right: 15px; top: 50%; transform: translateY(-50%);
            cursor: pointer; color: #aaa; font-size: 18px; transition: 0.3s; z-index: 10;
        }
        .toggle-password:hover { color: var(--primary); }

        .error-box {
            background-color: #fff5f5; color: #e74c3c; padding: 15px; 
            border-radius: 10px; margin-bottom: 25px; font-size: 13px; 
            border-left: 5px solid #e74c3c;
        }

        @media (max-width: 900px) {
            .auth-container { flex-direction: column; overflow-y: auto; }
            .auth-left { display: none; } 
            .auth-right { width: 100%; padding: 40px 25px; flex: none; min-height: 100vh; }
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
                <p>Silakan lengkapi data diri Kamu di bawah ini.</p>
            </div>

            @if ($errors->any())
                <div class="error-box">
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
                    <input type="text" name="nama_lengkap" class="form-control" placeholder="Contoh: Budi Santoso" value="{{ old('nama_lengkap') }}" required autofocus>
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input type="email" name="email" class="form-control" placeholder="nama@email.com" value="{{ old('email') }}" required>
                </div>

                <div class="form-group">
                    <label>Kelas</label>
                    <select name="kelas_id" class="form-control" required>
                        <option value="">-- Pilih Kelas Kamu --</option>
                        @if(isset($data_kelas))
                            @foreach($data_kelas as $kelas)
                                <option value="{{ $kelas->id }}" {{ old('kelas_id') == $kelas->id ? 'selected' : '' }}>
                                    {{ $kelas->nama }}
                                </option>
                            @endforeach
                        @else
                            <option value="" disabled>Data kelas tidak ditemukan</option>
                        @endif
                    </select>
                </div>

                <div class="row">
                    <div class="col form-group">
                        <label>Kata Sandi</label>
                        <div class="input-group">
                            <input type="password" name="password" id="password" class="form-control password-input" placeholder="••••••••" required>
                            <i class="fa-regular fa-eye toggle-password" id="icon-pass" onclick="toggleVisibility('password', 'icon-pass')"></i>
                        </div>
                    </div>
                    
                    <div class="col form-group">
                        <label>Konfirmasi Sandi</label>
                        <div class="input-group">
                            <input type="password" name="password_confirmation" id="password_confirmation" class="form-control password-input" placeholder="••••••••" required>
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

            <div class="back-home">
                <a href="{{ route('home') }}">
                    <i class="fa-solid fa-arrow-left"></i> Kembali ke beranda
                </a>
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