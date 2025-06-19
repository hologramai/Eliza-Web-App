declare global {
  interface Window {
    google?: any;
    handleCredentialResponse?: (response: any) => void;
  }
}

export interface GoogleUser {
  email: string;
  name: string;
  picture: string;
  sub: string; // Google user ID
}

export const googleAuthService = {
  // Initialize Google Sign-In
  initialize(clientId: string, callback: (user: GoogleUser) => void) {
    // Create script tag for Google Sign-In
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    // Handle credential response
    window.handleCredentialResponse = (response: any) => {
      // Decode JWT token to get user info
      const userObject = this.decodeJwtResponse(response.credential);
      callback(userObject);
    };

    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: window.handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });
    };
  },

  // Programmatically trigger Google Sign-In
  prompt() {
    if (window.google) {
      window.google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          console.log('Google Sign-In prompt was not displayed or was skipped');
        }
      });
    }
  },

  // Decode JWT token
  decodeJwtResponse(token: string): GoogleUser {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    const payload = JSON.parse(jsonPayload);
    return {
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      sub: payload.sub,
    };
  },

  // Sign out
  signOut() {
    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
    }
  },
};