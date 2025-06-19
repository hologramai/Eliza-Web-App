import React, { useState, useEffect } from 'react';
import AppShell from '../components/layout/AppShell';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import StatusBanner from '../components/status/StatusBanner';
import AvatarWithVoice from '../components/avatar/AvatarWithVoice';
import MessageList from '../components/chat/MessageList';
import InputBar from '../components/chat/InputBar';
import SignUpModal from '../components/subscription/SignUpModal';
import { useWallet } from '../hooks/useWallet';
import { useChat } from '../hooks/useChat';
import { useFloat } from '../hooks/useFloat';
import { useSubscription } from '../hooks/useSubscription';
import { googleAuthService, GoogleUser } from '../services/googleAuth';

// Replace with your actual Google Client ID
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';

const Eliza: React.FC = () => {
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const [googleUser, setGoogleUser] = useState<GoogleUser | null>(null);
  
  // Custom hooks
  const { wallet, connectWallet, disconnectWallet, getShortAddress } = useWallet();
  const { messages, inputValue, setInputValue, isTyping, userStatus, sendMessage } = useChat(wallet.address || googleUser?.email || null);
  const { shouldFloat, triggerFloat } = useFloat();
  const { isSignUpModalOpen, openSignUpModal, closeSignUpModal, handleSelectPlan } = useSubscription();

  // Initialize Google Sign-In
  useEffect(() => {
    googleAuthService.initialize(GOOGLE_CLIENT_ID, (user) => {
      setGoogleUser(user);
      console.log('Google user signed in:', user);
    });
  }, []);

  // Check if user has sent their first message
  useEffect(() => {
    // Count user messages (not Eliza's)
    const userMessageCount = messages.filter(msg => !msg.isEliza).length;
    if (userMessageCount > 0 && !hasStartedChat) {
      setHasStartedChat(true);
    }
  }, [messages, hasStartedChat]);

  const handleSendMessage = async () => {
    const success = await sendMessage();
    
    if (success) {
      // Trigger voice and float animations on successful message
      setIsVoiceActive(true);
      triggerFloat();
      
      // Stop voice animation after 3 seconds
      setTimeout(() => setIsVoiceActive(false), 3000);
    }
  };

  const handleGoogleSignIn = () => {
    googleAuthService.prompt();
  };

  const handleSignOut = () => {
    if (wallet.isConnected) {
      disconnectWallet();
    }
    if (googleUser) {
      googleAuthService.signOut();
      setGoogleUser(null);
    }
  };

  return (
    <AppShell>
      <div className="h-screen flex flex-col">
        <Header
          userStatus={userStatus}
          wallet={wallet}
          googleUser={googleUser}
          onConnectWallet={connectWallet}
          onDisconnectWallet={disconnectWallet}
          onGoogleSignIn={handleGoogleSignIn}
          onSignOut={handleSignOut}
          getShortAddress={getShortAddress}
        />

        <div className={`flex-1 flex p-4 pb-20 transition-all duration-700 ${hasStartedChat ? '' : 'items-center justify-center'}`}>
          <div className={`flex ${hasStartedChat ? 'w-full max-w-7xl mx-auto gap-6 h-full' : 'flex-col items-center w-full max-w-xl'}`}>
            {/* Eliza Avatar Section */}
            <div className={`transition-all duration-700 ${hasStartedChat ? 'w-2/5 h-full' : 'w-full flex flex-col items-center'}`}>
              {/* Only show status banner before first message */}
              {!hasStartedChat && (
                <StatusBanner wallet={wallet} getShortAddress={getShortAddress} googleUser={googleUser} />
              )}
              <AvatarWithVoice 
                shouldFloat={shouldFloat} 
                isVoiceActive={isVoiceActive} 
                isRectangle={hasStartedChat}
              />
            </div>

            {/* Chat Section */}
            <div className={`transition-all duration-700 ${hasStartedChat ? 'flex-1 h-full flex flex-col' : 'w-full'}`}>
              <div className="flex-1 overflow-hidden mb-4">
                <MessageList 
                  messages={messages} 
                  isTyping={isTyping} 
                  isExpanded={hasStartedChat}
                />
              </div>
              
              <InputBar
                inputValue={inputValue}
                setInputValue={setInputValue}
                onSendMessage={handleSendMessage}
                isTyping={isTyping}
                userStatus={userStatus}
                onOpenSignUp={openSignUpModal}
              />
            </div>
          </div>
        </div>

        <Footer />
      </div>

      {/* Sign Up Modal */}
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={closeSignUpModal}
        onSelectPlan={handleSelectPlan}
      />
    </AppShell>
  );
};

export default Eliza;