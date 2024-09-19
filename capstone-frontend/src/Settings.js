import NavBar from "./NavBar";

const Settings = () => {
    return (
        <div>
            <div class="settings-page" id="settings">
                <h1>Parent Settings</h1>
                <section class="settings-section">
                    <h2>Account Information</h2>
                    <form id="account-info-form">
                        <div class="setting-group">
                            <label for="username">Username:</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value="CurrentUsername"
                            />
                        </div>
                        <div class="setting-group">
                            <label for="email">Email Address:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value="parent@example.com"
                            />
                        </div>
                        <div class="setting-group">
                            <label for="phone">Phone Number:</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value="123-456-7890"
                            />
                        </div>
                        <div class="setting-group">
                            <label for="password">Change Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter new password"
                            />
                        </div>
                    </form>
                </section>
                <section class="settings-section">
                    <h2>Child Information</h2>
                    <form id="child-info-form">
                        <div class="setting-group">
                            <label for="child-name">Child's Name:</label>
                            <input
                                type="text"
                                id="child-name"
                                name="child-name"
                                value="Child's Name"
                            />
                        </div>
                        <div class="setting-group">
                            <label for="child-age">Child's Age:</label>
                            <input
                                type="number"
                                id="child-age"
                                name="child-age"
                                value="5"
                            />
                        </div>
                    </form>
                </section>
                <section class="settings-section">
                    <h2>Notification Preferences</h2>
                    <form id="notification-settings-form">
                        <div class="setting-group">
                            <label for="notifications">
                                Receive Notifications:
                            </label>
                            <select id="notifications" name="notifications">
                                <option value="email">Email</option>
                                <option value="sms">SMS</option>
                                <option value="both">Both</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </form>
                </section>
                <section class="settings-section">
                    <h2>Security Settings</h2>
                    <form id="security-settings-form">
                        <div class="setting-group">
                            <label for="two-factor-auth">
                                Two-Factor Authentication:
                            </label>
                            <select id="two-factor-auth" name="two-factor-auth">
                                <option value="enabled">Enabled</option>
                                <option value="disabled">Disabled</option>
                            </select>
                        </div>
                    </form>
                </section>

                <button type="submit" class="save-button">
                    Save Changes
                </button>
                <p id="confirmation-message" class="confirmation-message"></p>
            </div>
        </div>
    );
};

export default Settings;
