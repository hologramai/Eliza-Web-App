import React, { useState, useEffect } from 'react';
import AppShell from '../components/layout/AppShell';
import Header from '../components/layout/Header';
import SimpleFooter from '../components/layout/SimpleFooter';
import StatusBanner from '../components/status/StatusBanner';
import AvatarWithVoice from '../components/avatar/AvatarWithVoice';
import MessageList from '../components/chat/MessageList';
import InputBar from '../components/chat/InputBar';
import SignUpModal from '../components/subscription/SignUpModal';
import { useWallet } from '../hooks/useWallet';
import { useChat } from '../hooks/chat/useChat';
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
        {/* Header - Always visible with high z-index */}
        <div className="flex-shrink-0 z-40 relative">
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
        </div>

        {/* Main Content Area */}
        <div className={`flex-1 flex p-4 transition-all duration-700 ${hasStartedChat ? 'pt-2' : 'items-center justify-center'} overflow-hidden min-h-0`}>
          <div className={`flex ${hasStartedChat ? 'w-full max-w-7xl mx-auto gap-6 h-full min-h-0' : 'flex-col items-center w-full max-w-xl'}`}>
            
            {/* Eliza Avatar Section */}
            <div className={`transition-all duration-700 ${hasStartedChat ? 'w-2/5 h-full flex flex-col min-h-0' : 'w-full flex flex-col items-center'}`}>
              {/* Only show status banner before first message */}
              {!hasStartedChat && (
                <StatusBanner wallet={wallet} getShortAddress={getShortAddress} googleUser={googleUser} />
              )}
              <div className={hasStartedChat ? 'flex-1 min-h-0' : ''}>
                <AvatarWithVoice 
                  shouldFloat={shouldFloat} 
                  isVoiceActive={isVoiceActive} 
                  isRectangle={hasStartedChat}
                />
              </div>
            </div>

            {/* Chat Section */}
            <div className={`transition-all duration-700 ${hasStartedChat ? 'flex-1 h-full flex flex-col min-h-0' : 'w-full'}`}>
              {hasStartedChat && (
                <div className="flex-1 min-h-0 mb-2 overflow-hidden">
                  <MessageList 
                    messages={messages} 
                    isTyping={isTyping} 
                    isExpanded={hasStartedChat}
                  />
                </div>
              )}
              
              <div className={hasStartedChat ? 'flex-shrink-0' : ''}>
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
        </div>

        {/* Footer - Always visible */}
        <div className="flex-shrink-0 z-30">
          <SimpleFooter />
        </div>
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