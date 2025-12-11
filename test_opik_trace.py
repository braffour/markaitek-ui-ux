#!/usr/bin/env python3
"""
Test script to send a trace to Opik for the current Cursor chat conversation.
This verifies that Opik configuration is working correctly.
"""

import sys
from datetime import datetime

try:
    from opik import Opik
except ImportError:
    print("❌ Opik package not installed. Install with: pip install opik")
    sys.exit(1)

def test_opik_trace():
    """Create a test trace in Opik for the current Cursor conversation."""
    
    print("🔍 Initializing Opik client...")
    
    try:
        # Initialize Opik - it will read from ~/.opik.config
        client = Opik()
        
        print("✅ Opik client initialized")
        print(f"📝 Creating test trace for Cursor conversation...")
        
        # Create a trace representing this conversation
        trace = client.trace(
            name="Cursor Chat - Opik Integration Test",
            input={
                "user_query": "Need to test this LLM trace into Opik with this current chat",
                "context": "Testing Opik integration with Cursor IDE",
                "timestamp": datetime.now().isoformat(),
            },
            metadata={
                "source": "cursor-ide",
                "project": "markaitek-ui-ux",
                "test_type": "integration_verification",
            }
        )
        
        # Add a span for the AI response
        span = trace.span(
            name="AI Response Generation",
            type="llm",
            input={
                "model": "gpt-4",
                "prompt": "User wants to test Opik tracing with current chat",
            },
            output={
                "response": "Creating test trace to verify Opik integration is working correctly.",
                "status": "success",
            },
            metadata={
                "provider": "openai",
                "tokens_used": 150,
            }
        )
        
        # End the span
        span.end()
        
        # End the trace
        trace.end()
        
        print("✅ Trace created successfully!")
        print(f"📊 Trace ID: {trace.id if hasattr(trace, 'id') else 'N/A'}")
        print(f"🔗 View in Opik dashboard: http://192.168.1.50:5173")
        print("\n💡 If this worked, your Cursor Opik extension should now trace conversations automatically.")
        
        return True
        
    except Exception as e:
        print(f"❌ Error creating trace: {e}")
        print("\n🔧 Troubleshooting:")
        print("1. Check your ~/.opik.config file has a valid API key")
        print("2. Verify the url_override points to the correct Opik instance")
        print("3. Ensure the 'cursor' project exists in your Opik workspace")
        print("4. Run 'opik healthcheck' to diagnose issues")
        return False

if __name__ == "__main__":
    success = test_opik_trace()
    sys.exit(0 if success else 1)

